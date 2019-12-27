import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import { Contact } from "../types";
type Props = {
  contact: Contact;
  focused: boolean;
  checked: boolean;
  focusCurrentElement: () => any;
  toggleCheckbox: () => any;
} & RouteComponentProps;

type State = {};

class ContactRow extends React.Component<Props, State> {
  redirectToContact = () => {
    this.props.history.push(`/contact?id=${this.props.contact.id}`);
  };

  render() {
    return (
      <Container
        focused={this.props.focused}
        onClick={this.redirectToContact}
        onMouseEnter={this.props.focusCurrentElement}>
        <Checkbox
          checked={this.props.checked}
          onChange={this.props.toggleCheckbox}
        />
        <Name>
          {this.props.contact.firstName} {this.props.contact.lastName}
        </Name>
      </Container>
    );
  }
}

export default withRouter(ContactRow);

const Container = styled.div<{ focused: boolean }>`
  display: flex;
  cursor: pointer;
  padding: 10px;
  color: rgb(187, 188, 190);
  background-color: ${(props) =>
    props.focused ? "rgb(40, 41, 45)" : "rgb(30, 31, 35)"};
  padding-left: ${(props) => (props.focused ? "28px" : "30px")};
  border-left: ${(props) => (props.focused ? "2px solid #ffffff" : "none")};
`;

const Name = styled.div`
  margin-left: 20px;
`;
