import styled from "@emotion/styled";
import * as Mousetrap from "mousetrap";
import * as React from "react";
import CommandLine from "../platform/CommandLine";
import SideBar from "../platform/SideBar";
import { TAB } from "../types";

type Props = {
  children: any;
  activeTab: TAB;
};

type State = {
  isCommandLineOpen: boolean;
};

export default class Home extends React.Component<Props, State> {
  state: State = {
    isCommandLineOpen: false,
  };

  componentDidMount() {
    Mousetrap.bind("command+k", () => {
      console.log("YA");
      this.setState({
        isCommandLineOpen: true,
      });
    });
    Mousetrap.bind("esc", () => {
      this.setState({
        isCommandLineOpen: false,
      });
    });
  }

  hideCommandLine = () => {
    this.setState({
      isCommandLineOpen: false,
    });
  };

  render() {
    return (
      <>
        <Container>
          <SideBar activeTab={this.props.activeTab} />
          <MainContainer>{this.props.children}</MainContainer>
        </Container>
        {this.state.isCommandLineOpen && (
          <CommandLine onClickOutside={this.hideCommandLine} />
        )}
      </>
    );
  }
}

const Container = styled.div`
  display: flex;
  color: #191919;
  background-color: rgb(30, 31, 36);
  height: 100%;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
