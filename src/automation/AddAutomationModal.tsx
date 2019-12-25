import styled from "@emotion/styled";
import * as React from "react";
import { Mutation, MutationFunction, MutationResult } from "react-apollo";
import ReactQuill from "react-quill";
import ClickOutside from "../components/ClickOutside";
import Command from "../components/icons/Keys/Command";
import Enter from "../components/icons/Keys/Enter";
import Input from "../components/Input";
import Shortcut from "../components/Shortcut";
import { Button } from "../components/StyledComponents";
import { CurrentUserWithAutomation_currentUser } from "../graphql/generated/types";
import { CREATE_TEMPLATE } from "../graphql/mutations";
import { CURRENT_USER_WITH_AUTOMATION } from "../graphql/queries";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import "./react-quill.css";

type Props = {
  user: CurrentUserWithAutomation_currentUser;
  onHideModal: () => any;
} & ShortcutProps;

type State = {
  name: string;
  content: string;
};

class AddAutomationModal extends React.Component<Props, State> {
  submitFunction: any = null;
  commandSubmitFunction: any = null;

  emailRef = React.createRef<any>();

  state: State = {
    name: "",
    content: "",
  };

  UNSAFE_componentWillMount() {
    // Prevent tab switching when at modal
    this.props.manager.bind(
      "tab",
      (ev: any) => {
        ev.stopPropagation();
      },
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "enter",
      this.submitFunction,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "command+enter",
      this.commandSubmitFunction,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("command+enter", this.constructor.name);
    this.props.manager.unbind("enter", this.constructor.name);
    this.props.manager.unbind("tab", this.constructor.name);
  }

  onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }
    this.setState({
      name: event.target.value,
    });
  };

  validateFields = () => {
    if (this.state.name == "") {
      return false;
    }

    return true;
  };

  onCreateTemplate = (data: any) => {};

  onChangeContent = (value: string) => {
    this.setState({
      content: value,
    });
  };

  render() {
    return (
      <ClickOutside onClickOutside={this.props.onHideModal}>
        <Background onClick={this.props.onHideModal}>
          <Container
            onClick={(ev) => {
              ev.stopPropagation();
            }}>
            <Mutation
              mutation={CREATE_TEMPLATE}
              onCompleted={this.onCreateTemplate}
              refetchQueries={[{ query: CURRENT_USER_WITH_AUTOMATION }]}>
              {(
                createTemplate: MutationFunction,
                { data, loading }: MutationResult,
              ) => {
                const submit = () => {
                  if (!this.validateFields()) {
                    return;
                  }

                  createTemplate({
                    variables: {
                      input: {
                        name: this.state.name,
                        content: this.state.content,
                      },
                    },
                    optimisticResponse: {
                      createTemplate: {},
                    },
                  });
                };

                this.props.manager.updateCallback(
                  "command+enter",
                  createTemplate,
                  this.constructor.name,
                );

                return (
                  <Modal>
                    <Header>New Template</Header>
                    <Body>
                      <Label>Name</Label>
                      <StyledInput
                        ref={this.emailRef}
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        shortcuts={[
                          {
                            keys: ["Meta", "Enter"],
                            callback: submit,
                          },
                          {
                            keys: ["Escape"],
                            callback: this.props.onHideModal,
                          },
                        ]}
                        autoFocus
                      />
                      <ReactQuill
                        theme="snow"
                        value={this.state.content}
                        onChange={this.onChangeContent}
                      />
                      <ButtonRow>
                        <CreateButton onClick={submit}>
                          Create
                          <StyledShortcut>
                            <Command />
                            <Break />
                            <Enter />
                          </StyledShortcut>
                        </CreateButton>
                      </ButtonRow>
                    </Body>
                  </Modal>
                );
              }}
            </Mutation>
          </Container>
        </Background>
      </ClickOutside>
    );
  }
}

export default withShortcuts(AddAutomationModal);

const StyledShortcut = styled(Shortcut)`
  margin-left: 4px;
`;

const Break = styled.div`
  height: 0px;
  width: 4px;
`;

const CreateButton = styled(Button)`
  flex: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Label = styled.div`
  color: rgb(187, 188, 190);
  font-size: 12px;
  display: flex;
  margin-bottom: 4px;
  margin-top: 10px;
  :first-div {
    margin-top: 0px;
  }
`;

const Header = styled.div`
  width: calc(100% - 40px);
  color: rgb(187, 188, 190);
  display: flex;
  padding: 10px 20px 10px 20px;
  background-color: rgb(45, 47, 49);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Body = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  background-color: rgb(36, 38, 40);
  padding: 10px 20px 20px 20px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-self: center;
  position: absolute;
  left: calc(50% - 300px);
  top: 5%;
  margin: auto;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  border-radius: 4px;
  display: flex;
`;

const StyledInput = styled(Input)`
  -webkit-appearance: none;
  border: none;
  background-image: none;
  background-color: rgb(45, 47, 49);
  padding: 10px 12px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
  font-size: 14px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a0a0a0;
  }
  color: rgb(244, 244, 246);
  margin-bottom: 20px;
`;
