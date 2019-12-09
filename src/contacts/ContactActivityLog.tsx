import styled from "@emotion/styled";
import * as React from "react";
import { CurrentUserWithContact_currentUser_contact } from "../graphql/generated/types";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import Draft from "./Draft";

type Props = {
  contact: CurrentUserWithContact_currentUser_contact;
} & ShortcutProps;

type State = {
  showDraft: boolean;
};

class ContactActivityLog extends React.Component<Props, State> {
  state: State = {
    showDraft: false,
  };

  UNSAFE_componentWillMount() {
    this.props.manager.bind("c", this.showDraft, this.constructor.name, 1);
  }

  componentWillUnmount() {
    this.props.manager.unbind("c", this.constructor.name);
  }

  showDraft = (event: React.KeyboardEvent) => {
    this.setState({
      showDraft: true,
    });
    event.preventDefault();
  };

  hideDraft = () => {
    this.setState({
      showDraft: false,
    });
  };

  render() {
    return (
      <Container>
        <ActivityLogHeader>Activity Log</ActivityLogHeader>
        {this.state.showDraft && (
          <Draft contact={this.props.contact} hideDraft={this.hideDraft} />
        )}
      </Container>
    );
  }
}

export default withShortcuts(ContactActivityLog);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
  width: calc(100% - 380px);
  color: rgb(255, 255, 255);
  padding: 40px;
`;

const ActivityLogHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
