import styled from "@emotion/styled";
import * as React from "react";
import { Contact } from "../types";

type Props = {
  contact: Contact;
};

type State = {};

class ContactRow extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <div>Hello</div>
      </Container>
    );
  }
}

export default ContactRow;

const Container = styled.div`
  display: flex;
  height: 20px;
`;
