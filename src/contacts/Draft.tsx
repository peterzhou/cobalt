import styled from "@emotion/styled";
import * as React from "react";
import { Mutation, MutationFunction, MutationResult } from "react-apollo";
import Input from "../components/Input";
import { CurrentUserWithContact_currentUser_contact } from "../graphql/generated/types";
import { SEND_EMAIL } from "../graphql/mutations";
import { CURRENT_USER_WITH_CONTACT } from "../graphql/queries";
import withShortcuts from "../shortcuts/withShortcuts";
import { SEND_DRAFT_ERROR, ShortcutProps } from "../types";
import { validateEmail } from "../utils";

type Props = {
  contact: CurrentUserWithContact_currentUser_contact;
  hideDraft: () => any;
} & ShortcutProps;

type State = {
  toEmails: string[];
  ccEmails: string[];
  bccEmails: string[];
  subject: string;
  body: string;
  error: SEND_DRAFT_ERROR | null;
};

class Draft extends React.Component<Props, State> {
  state: State = {
    toEmails: [this.props.contact.email],
    ccEmails: [],
    bccEmails: [],
    subject: "",
    body: "",
    error: null,
  };

  UNSAFE_componentWillMount() {
    this.props.manager.bind(
      "esc",
      this.props.hideDraft,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "command+enter",
      () => {},
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("esc", this.constructor.name);
    this.props.manager.unbind("command+enter", this.constructor.name);
  }

  validateFields = () => {
    if (
      this.state.toEmails[0] === "" ||
      !validateEmail(this.state.toEmails[0])
    ) {
      this.setState({
        error: SEND_DRAFT_ERROR.EMAIL,
      });
      return false;
    }

    return true;
  };

  onSentDraft = (data: any) => {
    this.props.hideDraft();
  };

  onToEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      toEmails: [event.target.value],
    });
  };

  onSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subject: event.target.value,
    });
  };

  onBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      body: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Mutation
          mutation={SEND_EMAIL}
          onCompleted={this.onSentDraft}
          refetchQueries={[
            {
              query: CURRENT_USER_WITH_CONTACT,
              variables: { id: this.props.contact.id },
            },
          ]}>
          {(sendEmail: MutationFunction, { data, loading }: MutationResult) => {
            const submit = () => {
              if (!this.validateFields()) {
                return;
              }

              sendEmail({
                variables: {
                  input: {
                    toEmails: this.state.toEmails,
                    ccEmails: this.state.ccEmails,
                    bccEmails: this.state.bccEmails,
                    subject: this.state.subject,
                    body: this.state.body,
                  },
                },
              });
            };

            this.props.manager.updateCallback(
              "command+enter",
              submit,
              this.constructor.name,
            );

            const shortcuts = [
              {
                keys: ["Meta", "Enter"],
                callback: submit,
              },
              {
                keys: ["Escape"],
                callback: this.props.hideDraft,
              },
            ];

            return (
              <>
                <ToHolder>
                  <ToTitle>To</ToTitle>
                  <Input
                    autoFocus
                    value={this.state.toEmails[0]}
                    onChange={this.onToEmailChange}
                    shortcuts={shortcuts}
                  />
                </ToHolder>
                <Break />
                <Input
                  value={this.state.subject}
                  onChange={this.onSubjectChange}
                  placeholder="Subject"
                  shortcuts={shortcuts}
                />
                <Break />
                <Input
                  value={this.state.body}
                  onChange={this.onBodyChange}
                  placeholder="Say hello"
                  shortcuts={shortcuts}
                />
                <Break />
                <Border />
                <CommandHolder>
                  <Send onClick={submit}>Send</Send>
                </CommandHolder>
              </>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

export default withShortcuts(Draft);

const Container = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  background-color: rgb(45, 47, 49);
  border-radius: 4px;
  padding: 20px;
`;

const Send = styled.button`
  border: 0px;
  padding: 0px;
  background: none;
  font-size: 14px;
  color: rgb(211, 212, 215);
  font-weight: bold;
`;

const CommandHolder = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
`;

const Break = styled.div`
  height: 20px;
`;

const Border = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgb(95, 97, 101);
`;

const ToHolder = styled.div`
  display: flex;
  align-items: center;
`;

const ToTitle = styled.div`
  display: flex;
  margin-right: 20px;
`;
