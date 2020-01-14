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
  focusedFilter: number;
};

const FILTERS = [
  { user: null, id: "1", name: "All Contacts", count: 126 },
  { user: null, id: "2", name: "My Contacts", count: 34 },
];

class Contacts extends React.Component<Props, State> {
  state: State = {
    focusedFilter: 0,
  };

  redirectToContact = (id: string) => {
    this.props.history.push(`/contact?id=${id}`);
  };

  getContactListing = (
    index: number,
    element: Contact,
    checked: boolean,
    focused: boolean,
    focusCurrentElement: () => any,
    toggleCheckbox: () => any,
  ) => {
    return (
      <ContactRow
        key={index}
        contact={element}
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
        <ContactsHeader
          user={this.props.user}
          currentFilter={this.state.focusedFilter}
          filters={FILTERS}
        />
        <Table
          onNextPage={() => {}}
          onPreviousPage={() => {}}
          currentPage={0}
          disablePrevious={false}
          totalCount={this.props.user.contacts.length}
          elementName="Contacts"
          disableNext={false}
          tableArray={this.props.user.contacts}
          tableListing={this.getContactListing}
          onClickTableListing={this.redirectToContact}
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
