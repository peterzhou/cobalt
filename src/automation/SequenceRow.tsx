import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import { CurrentUserWithAutomation_currentUser_sequences } from "../graphql/generated/types";

type Props = {
  sequence: CurrentUserWithAutomation_currentUser_sequences;
  focused: boolean;
  checked: boolean;
  focusCurrentElement: () => any;
  toggleCheckbox: () => any;
} & RouteComponentProps;

type State = {};

class SequenceRow extends React.Component<Props, State> {
  state: State = {};

  onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.toggleCheckbox();
  };

  redirectToContact = () => {
    this.props.history.push(`/sequence?id=${this.props.sequence.id}`);
  };

  render() {
    return (
      <Container focused={this.props.focused} onClick={this.redirectToContact}>
        <Checkbox
          checked={this.props.checked}
          onChange={this.onCheckboxChange}
        />
        <Name>{this.props.sequence.name}</Name>
      </Container>
    );
  }
}

export default withRouter(SequenceRow);

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
