import styled from "@emotion/styled";
import * as React from "react";
import Plus from "../components/icons/Plus";
import { CurrentUser_currentUser } from "../graphql/generated/types";
import { Filter } from "../types";
import AddContactModal from "./AddContactModal";

type Props = {
  user: CurrentUser_currentUser;
  filters: Filter[];
  currentFilter: number;
};

type State = {
  showNewContactModal: boolean;
};

class ContactsHeader extends React.Component<Props, State> {
  state: State = {
    showNewContactModal: false,
  };

  componentDidMount() {
    Mousetrap.bind("n", (event) => {
      this.showNewContactModal();
      event.preventDefault();
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind("n");
  }

  showNewContactModal = () => {
    this.setState({
      showNewContactModal: true,
    });
  };

  hideNewContactModal = () => {
    this.setState({
      showNewContactModal: false,
    });
  };

  render() {
    return (
      <>
        <Header>
          {this.props.filters.map((filter, index) => {
            return (
              <FilterContainer
                active={index === this.props.currentFilter}
                key={index}>
                {filter.name}
                <Count active={index === this.props.currentFilter}>
                  {filter.count}
                </Count>
              </FilterContainer>
            );
          })}
          <NewContactButton onClick={this.showNewContactModal}>
            <Plus />
          </NewContactButton>
        </Header>
        {this.state.showNewContactModal && (
          <AddContactModal
            onHideModal={this.hideNewContactModal}
            user={this.props.user}
          />
        )}
      </>
    );
  }
}

export default ContactsHeader;

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

const Count = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? "rgb(127, 128, 130)" : "rgb(97, 98, 100)"};
  margin-left: 10px;
  font-size: 16px;
`;

const NewContactButton = styled.div`
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
