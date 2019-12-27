import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Shortcut from "../../components/Shortcut";
import { Button } from "../../components/StyledComponents";
import { CurrentUserWithSequence_currentUser } from "../../graphql/generated/types";
import withShortcuts from "../../shortcuts/withShortcuts";
import { ShortcutProps } from "../../types";
import Step from "./Step";

type Props = {
  user: CurrentUserWithSequence_currentUser;
} & ShortcutProps &
  RouteComponentProps;

type State = {
  showAddTemplateToSequenceModal: boolean;
};

class Sequence extends React.Component<Props, State> {
  state: State = {
    showAddTemplateToSequenceModal: false,
  };
  UNSAFE_componentWillMount() {
    this.props.manager.bind("esc", this.redirectBack, this.constructor.name, 2);
    this.props.manager.bind(
      "n",
      this.showAddTemplateToSequenceModal,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("esc", this.constructor.name);
    this.props.manager.unbind("n", this.constructor.name);
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  showAddTemplateToSequenceModal = () => {
    this.setState({
      showAddTemplateToSequenceModal: true,
    });
  };

  hideAddTemplateToSequenceModal = () => {
    this.setState({
      showAddTemplateToSequenceModal: false,
    });
  };

  render() {
    return (
      <Container>
        {this.props.user.sequence &&
          this.props.user.sequence.steps.map((step) => {
            return <Step>Hello</Step>;
          })}
        <AddNewStep>
          <Circle />
          <AddTemplateToSequenceButton
            onClick={this.showAddTemplateToSequenceModal}>
            Add Step
            <StyledShortcut>&nbsp;N&nbsp;</StyledShortcut>
          </AddTemplateToSequenceButton>
        </AddNewStep>
        {this.state.showAddTemplateToSequenceModal && <div>Hello</div>}
      </Container>
    );
  }
}

export default withRouter(withShortcuts(Sequence));

const Circle = styled.div`
  display: flex;
  height: 20px;
  width: 20px;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
`;

const AddTemplateToSequenceButton = styled(Button)`
  margin-left: 10px;
`;

const StyledShortcut = styled(Shortcut)`
  margin-left: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  padding: 40px;
`;

const AddNewStep = styled.div`
  display: flex;
  align-items: center;
`;
