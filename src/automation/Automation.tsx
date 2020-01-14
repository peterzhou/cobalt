import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Table from "../components/Table";
import {
  CurrentUserWithAutomation_currentUser,
  CurrentUserWithAutomation_currentUser_sequences,
  CurrentUserWithAutomation_currentUser_templates,
} from "../graphql/generated/types";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import AutomationHeader from "./AutomationHeader";
import SequenceRow from "./SequenceRow";
import TemplateRow from "./TemplateRow";

type Props = {
  user: CurrentUserWithAutomation_currentUser;
} & RouteComponentProps &
  ShortcutProps;

type State = {
  automationTag: AUTOMATION_TAG;
};

export enum AUTOMATION_TAG {
  SEQUENCE = "SEQUENCE",
  TEMPLATE = "TEMPLATE",
}

class Automation extends React.Component<Props, State> {
  state: State = {
    automationTag: AUTOMATION_TAG.SEQUENCE,
  };

  redirectToAutomation = (id: string) => {
    this.props.history.push(
      `/${
        this.state.automationTag === AUTOMATION_TAG.SEQUENCE
          ? "sequence"
          : "template"
      }?id=${id}`,
    );
  };

  toggleAutomation = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      automationTag:
        this.state.automationTag === AUTOMATION_TAG.SEQUENCE
          ? AUTOMATION_TAG.TEMPLATE
          : AUTOMATION_TAG.SEQUENCE,
    });
  };

  getTemplateListing = (
    index: number,
    element: CurrentUserWithAutomation_currentUser_templates,
    checked: boolean,
    focused: boolean,
    focusCurrentElement: () => any,
    toggleCheckbox: () => any,
  ) => {
    return (
      <TemplateRow
        key={index}
        template={element}
        checked={checked}
        focused={focused}
        focusCurrentElement={focusCurrentElement}
        toggleCheckbox={toggleCheckbox}
      />
    );
  };

  getSequenceListing = (
    index: number,
    element: CurrentUserWithAutomation_currentUser_sequences,
    checked: boolean,
    focused: boolean,
    focusCurrentElement: () => any,
    toggleCheckbox: () => any,
  ) => {
    return (
      <SequenceRow
        key={index}
        sequence={element}
        checked={checked}
        focused={focused}
        focusCurrentElement={focusCurrentElement}
        toggleCheckbox={toggleCheckbox}
      />
    );
  };

  render() {
    return (
      <Container>
        <AutomationHeader
          user={this.props.user}
          currentAutomationTag={this.state.automationTag}
        />
        <Table
          onNextPage={() => {}}
          onPreviousPage={() => {}}
          currentPage={0}
          disablePrevious={false}
          totalCount={
            this.state.automationTag === AUTOMATION_TAG.SEQUENCE
              ? this.props.user.sequences.length
              : this.props.user.templates.length
          }
          elementName="Contacts"
          disableNext={false}
          tableArray={
            this.state.automationTag === AUTOMATION_TAG.SEQUENCE
              ? this.props.user.sequences
              : this.props.user.templates
          }
          tableListing={
            this.state.automationTag === AUTOMATION_TAG.SEQUENCE
              ? this.getSequenceListing
              : this.getTemplateListing
          }
          onClickTableListing={this.redirectToAutomation}
        />
      </Container>
    );
  }
}

export default withRouter(withShortcuts(Automation));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
