import styled from "@emotion/styled";
import * as React from "react";
import Checkbox from "../components/Checkbox";
import { Contact } from "../types";

type Props = {
  contact: Contact;
  focused: boolean;
};

type State = {
  checked: boolean;
};

class ContactRow extends React.Component<Props, State> {
  state: State = {
    checked: false,
  };

  onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    return (
      <Container focused={this.props.focused}>
        <Checkbox
          checked={this.state.checked}
          onChange={this.onCheckboxChange}
        />
        <Name>
          {this.props.contact.firstName} {this.props.contact.lastName}
        </Name>
      </Container>
    );
  }
}

export default ContactRow;

const Container = styled.div<{ focused: boolean }>`
  display: flex;
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
