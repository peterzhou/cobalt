import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import { CurrentUserWithAutomation_currentUser_templates } from "../graphql/generated/types";

type Props = {
  template: CurrentUserWithAutomation_currentUser_templates;
  focused: boolean;
  checked: boolean;
  focusCurrentElement: () => any;
  toggleCheckbox: () => any;
} & RouteComponentProps;

type State = {};

class TemplateRow extends React.Component<Props, State> {
  state: State = {};

  onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.toggleCheckbox();
  };

  redirectToContact = () => {
    this.props.history.push(`/template?id=${this.props.template.id}`);
  };

  render() {
    return (
      <Container focused={this.props.focused} onClick={this.redirectToContact}>
        <Checkbox
          checked={this.props.checked}
          onChange={this.onCheckboxChange}
        />
        <Name>{this.props.template.name}</Name>
      </Container>
    );
  }
}

export default withRouter(TemplateRow);

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
