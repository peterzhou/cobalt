import * as React from "react";
import DashboardShell from "./components/DashboardShell";
import withShortcuts from "./shortcuts/withShortcuts";
import { ShortcutProps, TAB } from "./types";

type Props = {} & ShortcutProps;

type State = {
  isCommandLineOpen: boolean;
};

class Home extends React.Component<Props, State> {
  state: State = {
    isCommandLineOpen: false,
  };

  componentDidMount() {
    this.props.manager.bind("command+k", () => {
      this.setState({
        isCommandLineOpen: true,
      });
    });
    this.props.manager.bind("esc", () => {
      console.log("WHAT THE FUCK");
      this.setState({
        isCommandLineOpen: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.manager.unbind("command+k");
    this.props.manager.unbind("esc");
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

export default withShortcuts(Home);
