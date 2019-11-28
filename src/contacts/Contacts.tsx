import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Table from "../components/Table";
import { CurrentUser_currentUser } from "../graphql/generated/types";
import { Contact } from "../types";
import ContactRow from "./ContactRow";
import ContactsHeader from "./ContactsHeader";

type Props = {
  user: CurrentUser_currentUser;
} & RouteComponentProps;

type State = {
  focusedIndex: number;
  focusedFilter: number;
};

const FILTERS = [
  { user: null, id: "1", name: "All Contacts", count: 126 },
  { user: null, id: "2", name: "My Contacts", count: 34 },
];

class Contacts extends React.Component<Props, State> {
  state: State = {
    focusedIndex: 0,
    focusedFilter: 0,
  };

  componentDidMount() {
    Mousetrap.bind("j", this.focusNextElement);
    Mousetrap.bind("k", this.focusPreviousElement);
    Mousetrap.bind("tab", this.nextFilter);
    Mousetrap.bind("shift+tab", this.previousFilter);
    Mousetrap.bind("enter", this.redirectToContact);
  }

  componentWillUnmount() {
    Mousetrap.unbind("j");
    Mousetrap.unbind("k");
    Mousetrap.unbind("tab");
    Mousetrap.unbind("shift+tab");
    Mousetrap.unbind("enter");
  }

  redirectToContact = () => {
    const contactId = this.props.user.contacts[this.state.focusedIndex].id;
    this.props.history.push(`/contact?id=${contactId}`);
  };

  focusNextElement = () => {
    if (this.state.focusedIndex >= this.props.user.contacts.length - 1) {
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

  nextFilter = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      focusedFilter: (this.state.focusedFilter + 1) % FILTERS.length,
      focusedIndex: 0,
    });
  };

  previousFilter = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      focusedFilter: (this.state.focusedFilter + 1) % FILTERS.length,
      focusedIndex: 0,
    });
  };

  getContactListing = (index: number, element: Contact) => {
    return (
      <ContactRow
        key={index}
        contact={element}
        focused={this.state.focusedIndex === index}
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

export default withRouter(Contacts);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
