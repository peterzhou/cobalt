import styled from "@emotion/styled";
import * as React from "react";
import Plus from "../components/icons/Plus";
import { CurrentUserWithAutomation_currentUser } from "../graphql/generated/types";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import AddAutomationModal from "./AddAutomationModal";
import { AUTOMATION_TAG } from "./Automation";

type Props = {
  user: CurrentUserWithAutomation_currentUser;
  currentAutomationTag: AUTOMATION_TAG;
} & ShortcutProps;

type State = {
  showNewTemplateModal: boolean;
};

class AutomationHeader extends React.Component<Props, State> {
  state: State = {
    showNewTemplateModal: false,
  };

  UNSAFE_componentWillMount() {
    this.props.manager.bind(
      "n",
      (event: any) => {
        this.showNewTemplateModal();
        event.preventDefault();
      },
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("n", this.constructor.name);
  }

  showNewTemplateModal = () => {
    this.setState({
      showNewTemplateModal: true,
    });
  };

  hideNewTemplateModal = () => {
    this.setState({
      showNewTemplateModal: false,
    });
  };

  render() {
    return (
      <Header>
        <FilterContainer
          active={this.props.currentAutomationTag === AUTOMATION_TAG.SEQUENCE}
          key={AUTOMATION_TAG.SEQUENCE}>
          Sequences
        </FilterContainer>
        <FilterContainer
          active={this.props.currentAutomationTag === AUTOMATION_TAG.TEMPLATE}
          key={AUTOMATION_TAG.TEMPLATE}>
          Templates
        </FilterContainer>
        <NewTemplateButton onClick={this.showNewTemplateModal}>
          <Plus />
        </NewTemplateButton>
        {this.state.showNewTemplateModal && (
          <AddAutomationModal
            user={this.props.user}
            onHideModal={this.hideNewTemplateModal}
          />
        )}
      </Header>
    );
  }
}

export default withShortcuts(AutomationHeader);

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const FilterContainer = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 30px;
  color: ${(props) =>
    props.active ? "rgb(255, 255, 255)" : "rgb(187, 188, 190)"};
`;

const NewTemplateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: auto;
  width: 30px;
  height: 30px;
  background-color: rgb(97, 111, 196);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(107, 121, 206);
  }
  transition: background-color 0.16s ease-in-out;
`;
