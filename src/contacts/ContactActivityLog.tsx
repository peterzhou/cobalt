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
  width: calc(100% - 200px);
  height: 100%;
  color: rgb(255, 255, 255);
  padding: 40px;
`;
