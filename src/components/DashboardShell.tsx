import styled from "@emotion/styled";
import * as React from "react";
import CommandLine from "../platform/CommandLine";
import SideBar from "../platform/SideBar";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps, TAB } from "../types";

type Props = {
  children: any;
  activeTab: TAB;
} & ShortcutProps;

type State = {
  isCommandLineOpen: boolean;
};

class DashboardShell extends React.Component<Props, State> {
  state: State = {
    isCommandLineOpen: false,
  };

  componentWillMount() {
    this.props.manager.bind(
      "command+k",
      () => {
        console.log("YA");
        this.setState({
          isCommandLineOpen: true,
        });
      },
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "esc",
      () => {
        this.setState({
          isCommandLineOpen: false,
        });
      },
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("command+k", this.constructor.name);
    this.props.manager.unbind("esc", this.constructor.name);
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

export default withShortcuts(DashboardShell);

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
