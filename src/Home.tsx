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

  UNSAFE_componentWillMount() {
    this.props.manager.bind(
      "command+k",
      () => {
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
    const currentComponent = <div style={{ color: "#ffffff" }}>Current</div>;
    return (
      <DashboardShell activeTab={TAB.HOME}>{currentComponent}</DashboardShell>
    );
  }
}

export default withShortcuts(Home);
