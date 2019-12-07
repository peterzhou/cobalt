import styled from "@emotion/styled";
import * as React from "react";
import { CurrentUserWithContact_currentUser_contact } from "../graphql/generated/types";

type Props = {
  contact: CurrentUserWithContact_currentUser_contact;
};

type State = {};

class ContactActivityLog extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <div>Activity Log</div>
      </Container>
    );
  }
}

export default ContactActivityLog;

const Container = styled.div`
  display: flex;
  flex-direction: 100%;
  height: calc(100% - 80px);
  width: calc(100% - 380px);
  color: rgb(255, 255, 255);
  padding: 40px;
`;
