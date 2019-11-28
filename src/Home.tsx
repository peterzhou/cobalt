import * as Mousetrap from "mousetrap";
import * as React from "react";
import DashboardShell from "./components/DashboardShell";
import { TAB } from "./types";

type Props = {};

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
    const currentComponent = <div style={{ color: "#ffffff" }}>Current</div>;
    return (
      <DashboardShell activeTab={TAB.HOME}>{currentComponent}</DashboardShell>
    );
  }
}
