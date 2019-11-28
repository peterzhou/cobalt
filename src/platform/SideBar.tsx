import styled from "@emotion/styled";
import * as React from "react";
import { Link } from "react-router-dom";
import Home from "../components/icons/Home";
import Person from "../components/icons/Person";
import { TAB } from "../types";

type Props = {
  activeTab: TAB;
};

type State = {};

class SideBar extends React.Component<Props, State> {
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
      </Container>
    );
  }
}

export default SideBar;

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
