import styled from "@emotion/styled";
import * as Mousetrap from "mousetrap";
import * as React from "react";
import CommandLine from "./platform/CommandLine";
import SideBar from "./platform/SideBar";
import { VIEWS } from "./types";

type Props = {};

type State = {
  isCommandLineOpen: boolean;
  view: VIEWS;
};

export default class Home extends React.Component<Props, State> {
  state: State = {
    isCommandLineOpen: false,
    view: VIEWS.HOME,
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
    const currentComponent = <div style={{ color: "#ffffff" }}>Current</div>;
    return (
      <>
        <Container>
          <SideBar />
          <MainContainer>{currentComponent}</MainContainer>
        </Container>
        {this.state.isCommandLineOpen && (
          <CommandLine
            onClickOutside={this.hideCommandLine}
            view={this.state.view}
          />
        )}
      </>
    );
  }
}

const Container = styled.div`
  display: flex;
  color: #191919;
  background-color: rgb(21, 21, 26);
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
