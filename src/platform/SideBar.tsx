import styled from "@emotion/styled";
import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Home from "../components/icons/Home";
import Person from "../components/icons/Person";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps, TAB } from "../types";

type Props = {
  activeTab: TAB;
} & ShortcutProps &
  RouteComponentProps;

type State = {};

class SideBar extends React.Component<Props, State> {
  componentWillMount() {
    this.props.manager.bind(
      "g h",
      () => {
        this.props.history.push("/home");
      },
      this.constructor.name,
      1,
    );

    this.props.manager.bind(
      "g s",
      () => {
        this.props.history.push("/settings");
      },
      this.constructor.name,
      1,
    );

    this.props.manager.bind(
      "g c",
      () => {
        this.props.history.push("/contacts");
      },
      this.constructor.name,
      1,
    );

    this.props.manager.bind(
      "g a",
      () => {
        this.props.history.push("/automation");
      },
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("g h", this.constructor.name);
    this.props.manager.unbind("g s", this.constructor.name);
    this.props.manager.unbind("g c", this.constructor.name);
    this.props.manager.unbind("g a", this.constructor.name);
  }

  render() {
    return (
      <Container>
        <Link to="/home">
          <Tab active={this.props.activeTab === TAB.HOME}>
            <Home active={this.props.activeTab === TAB.HOME} />
            Home
          </Tab>
        </Link>
        <Break />
        <Link to="/contacts">
          <Tab active={this.props.activeTab === TAB.CONTACTS}>
            <Person active={this.props.activeTab === TAB.CONTACTS} />
            Contacts
          </Tab>
        </Link>
        <Break />
        <Link to="/settings">
          <Tab active={this.props.activeTab === TAB.SETTINGS}>
            <Home active={this.props.activeTab === TAB.SETTINGS} />
            Settings
          </Tab>
        </Link>
        <Break />
        <Link to="/automation">
          <Tab active={this.props.activeTab === TAB.AUTOMATION}>
            <Home active={this.props.activeTab === TAB.AUTOMATION} />
            Automation
          </Tab>
        </Link>
      </Container>
    );
  }
}

export default withShortcuts(withRouter(SideBar));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  min-width: 300px;
  background-color: rgb(30, 31, 35);
  border-right: 1px solid rgb(42, 44, 46);
  padding-top: 60px;
`;

const Tab = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 30px;
  color: ${(props) =>
    props.active ? "rgb(255, 255, 255)" : "rgb(187, 188, 190)"};
  height: 20px;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

const Break = styled.div`
  height: 10px;
`;
