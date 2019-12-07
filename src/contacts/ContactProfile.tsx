import styled from "@emotion/styled";
import * as React from "react";
import { CurrentUserWithContact_currentUser_contact } from "../graphql/generated/types";

type Props = {
  contact: CurrentUserWithContact_currentUser_contact;
};

type State = {};

class ContactProfile extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <ProfilePicture></ProfilePicture>
        <Name>
          {this.props.contact.firstName} {this.props.contact.lastName}
        </Name>
        <CompanyName>Lang</CompanyName>
      </Container>
    );
  }
}

export default ContactProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 300px;
  height: calc(100% - 80px);
  border-left: 1px solid rgb(45, 47, 49);
`;

const ProfilePicture = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgb(255, 255, 255);
`;

const Name = styled.div`
  margin-top: 20px;
  color: rgb(255, 255, 255);
  font-size: 20px;
`;

const CompanyName = styled.div`
  margin-top: 10px;
  color: rgb(187, 188, 190);
  font-size: 16px;
`;
