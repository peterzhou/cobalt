import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Table from "../components/Table";
import { CurrentUser_currentUser } from "../graphql/generated/types";
import withShortcuts from "../shortcuts/withShortcuts";
import { Contact, ShortcutProps } from "../types";
import ContactRow from "./ContactRow";
import ContactsHeader from "./ContactsHeader";

type Props = {
  user: CurrentUser_currentUser;
} & RouteComponentProps &
  ShortcutProps;

type State = {
  selectedIndices: number[];
  focusedIndex: number;
  focusedFilter: number;
};

const FILTERS = [
  { user: null, id: "1", name: "All Contacts", count: 126 },
  { user: null, id: "2", name: "My Contacts", count: 34 },
];

class Contacts extends React.Component<Props, State> {
  state: State = {
    selectedIndices: [],
    focusedIndex: 0,
    focusedFilter: 0,
  };

  redirectToContact = () => {
    const contactId = this.props.user.contacts[this.state.focusedIndex].id;
    this.props.history.push(`/contact?id=${contactId}`);
  };

  getContactListing = (index: number, element: Contact) => {
    return (
      <ContactRow
        key={index}
        contact={element}
        checked={
          this.state.selectedIndices.find((currentIndex) => {
            return currentIndex === index;
          }) !== undefined
        }
        focused={this.state.focusedIndex === index}
        focusCurrentElement={() => {
          this.setState({
            focusedIndex: index,
          });
        }}
        toggleCheckbox={() => {
          this.toggleSelectedIndex(index);
        }}
      />
    );
  };

  render() {
    return (
      <Container>
        <ContactsHeader
          user={this.props.user}
          currentFilter={this.state.focusedFilter}
          filters={FILTERS}
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
          tableArray={this.props.user.contacts}
          tableListing={this.getContactListing}
        />
      </Container>
    );
  }
}

export default withRouter(withShortcuts(Contacts));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
