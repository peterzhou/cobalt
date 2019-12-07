import gql from "graphql-tag";

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      firstName
      lastName
      assignee {
        id
      }
    }
  }
`;

export const ADD_GOOGLE_AUTH = gql`
  mutation AddGoogleAuth {
    addGoogleAuth
  }
`;

export const SEND_EMAIL = gql`
  mutation SendEmail($input: SendEmailInput!) {
    sendEmail(input: $input)
  }
`;
