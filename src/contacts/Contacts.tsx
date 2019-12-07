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

  UNSAFE_componentWillMount() {
    console.log("Contacts mounting");
    this.props.manager.bind(
      "j",
      this.focusNextElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "k",
      this.focusPreviousElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind("tab", this.nextFilter, this.constructor.name, 1);
    this.props.manager.bind(
      "shift+tab",
      this.previousFilter,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "enter",
      this.redirectToContact,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("j", this.constructor.name);
    this.props.manager.unbind("k", this.constructor.name);
    this.props.manager.unbind("tab", this.constructor.name);
    this.props.manager.unbind("shift+tab", this.constructor.name);
    this.props.manager.unbind("enter", this.constructor.name);
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

export default withRouter(withShortcuts(Contacts));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
