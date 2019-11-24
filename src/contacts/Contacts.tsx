import styled from "@emotion/styled";
import * as React from "react";
import Table from "../components/Table";
import { Contact } from "../types";
import ContactRow from "./ContactRow";

type Props = {};

type State = {};

const CONTACT_LIST: Contact[] = [
  {
    id: "1",
    firstName: "Peter",
    lastName: "Zhou",
    company: null,
  },
];

const contactListing = (index: number, element: Contact) => {
  return <ContactRow key={index} contact={element} />;
};

class Contacts extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Header></Header>
        <Table
          attributes={[]}
          onNextPage={() => {}}
          onPreviousPage={() => {}}
          currentPage={0}
          disablePrevious={false}
          totalCount={100}
          elementName="Contacts"
          disableNext={false}
          tableArray={CONTACT_LIST}
          tableListing={contactListing}
        />
      </Container>
    );
  }
}

export default Contacts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  height: 60px;
`;
