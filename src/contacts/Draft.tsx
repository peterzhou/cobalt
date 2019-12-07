import styled from "@emotion/styled";
import * as React from "react";
import { MutationFunction, MutationResult } from "react-apollo";
import { CurrentUserWithContact_currentUser_contact } from "../graphql/generated/types";
import { SEND_EMAIL } from "../graphql/mutations";
import { CURRENT_USER_WITH_CONTACT } from "../graphql/queries";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";

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
};

class Draft extends React.Component<Props, State> {
  state: State = {
    toEmails: [],
    ccEmails: [],
    bccEmails: [],
    subject: "",
    body: "",
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
      this.sendDraft,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("esc", this.constructor.name);
    this.props.manager.unbind("command+enter", this.constructor.name);
  }

  captureInputKeys = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // TODO: Make generalizable
    if (event.key === "Escape") {
      this.props.hideDraft();
    }
  };

  sendDraft = () => {};

  render() {
    return (
      <Container>
        <ToHolder>
          <ToTitle>To</ToTitle>
          <Input autoFocus onKeyDown={this.captureInputKeys} />
        </ToHolder>
        <Break />
        <Input onKeyDown={this.captureInputKeys} placeholder="Subject" />
        <Break />
        <Input onKeyDown={this.captureInputKeys} placeholder="Say hello" />
        <Break />
        <Border />
        <Mutation
          mutation={SEND_EMAIL}
          onCompleted={this.onCreateContact}
          refetchQueries={[{ query: CURRENT_USER_WITH_CONTACT }]}>
          {(
            createContact: MutationFunction,
            { data, loading }: MutationResult,
          ) => {
            const submit = () => {
              if (!this.validateFields()) {
                return;
              }

              createContact({
                variables: {
                  input: {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                  },
                },
                optimisticResponse: {
                  createContact: {
                    assignee: {
                      id: this.props.user.id,
                      __typename: "User",
                    },
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    __typename: "Contact",
                  },
                },
              });
            };

            const submitContact = (another: boolean) => {
              this.setState(
                {
                  anotherContact: another,
                },
                () => {
                  submit();
                },
              );
            };

            /*
             * TODO Need to unbind this or it will persist forever because render is called many times
             */
            this.props.manager.updateCallback(
              "enter",
              () => {
                submitContact(true);
              },
              this.constructor.name,
            );
            this.props.manager.updateCallback(
              "command+enter",
              () => {
                submitContact(true);
              },
              this.constructor.name,
            );

            return (
              <CommandHolder>
                <Send onClick={this.sendDraft}>Send</Send>
              </CommandHolder>
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
`;

const CommandHolder = styled.div`
  display: flex;
  width: calc(100% - 40px);
  padding: 20px;
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

const Input = styled.input`
  font-size: 16px;
  -webkit-appearance: none;
  border: none;
  background-image: none;
  background-color: rgb(45, 47, 49);
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a0a0a0;
  }
  color: rgb(244, 244, 246);
`;
