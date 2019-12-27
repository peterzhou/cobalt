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
  focusedIndex: number;
  automationTag: AUTOMATION_TAG;
};

export enum AUTOMATION_TAG {
  SEQUENCE = "SEQUENCE",
  TEMPLATE = "TEMPLATE",
}

class Automation extends React.Component<Props, State> {
  state: State = {
    focusedIndex: 0,
    automationTag: AUTOMATION_TAG.SEQUENCE,
  };

  UNSAFE_componentWillMount() {
    this.props.manager.bind(
      "j",
      this.focusNextElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "k",
      this.focusPreviousElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "tab",
      this.toggleAutomation,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "shift+tab",
      this.toggleAutomation,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "enter",
      this.redirectToAutomation,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("j", this.constructor.name);
    this.props.manager.unbind("k", this.constructor.name);
    this.props.manager.unbind("tab", this.constructor.name);
    this.props.manager.unbind("shift+tab", this.constructor.name);
    this.props.manager.unbind("enter", this.constructor.name);
  }

  redirectToAutomation = () => {
    const id =
      this.state.automationTag === AUTOMATION_TAG.SEQUENCE
        ? this.props.user.sequences[this.state.focusedIndex].id
        : this.props.user.templates[this.state.focusedIndex].id;
    this.props.history.push(
      `/${
        this.state.automationTag === AUTOMATION_TAG.SEQUENCE
          ? "sequence"
          : "template"
      }?id=${id}`,
    );
  };

  focusNextElement = () => {
    if (this.state.focusedIndex >= this.props.user.sequences.length - 1) {
      return;
    }
    this.setState({
      focusedIndex: this.state.focusedIndex + 1,
    });
  };

  focusPreviousElement = () => {
    if (this.state.focusedIndex === 0) {
      return;
    }
    this.setState({
      focusedIndex: this.state.focusedIndex - 1,
    });
  };

  toggleAutomation = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      automationTag:
        this.state.automationTag === AUTOMATION_TAG.SEQUENCE
          ? AUTOMATION_TAG.TEMPLATE
          : AUTOMATION_TAG.SEQUENCE,
      focusedIndex: 0,
    });
  };

  getTemplateListing = (
    index: number,
    element: CurrentUserWithAutomation_currentUser_templates,
  ) => {
    return (
      <TemplateRow
        key={index}
        template={element}
        focused={this.state.focusedIndex === index}
      />
    );
  };

  getSequenceListing = (
    index: number,
    element: CurrentUserWithAutomation_currentUser_sequences,
  ) => {
    return (
      <SequenceRow
        key={index}
        sequence={element}
        focused={this.state.focusedIndex === index}
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
          attributes={[]}
          onNextPage={() => {}}
          onPreviousPage={() => {}}
          currentPage={0}
          disablePrevious={false}
          totalCount={100}
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
