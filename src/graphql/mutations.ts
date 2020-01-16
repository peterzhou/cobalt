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

export const CREATE_TEMPLATE = gql`
  mutation CreateTemplate($input: CreateTemplateInput!) {
    createTemplate(input: $input) {
      id
      name
      content
    }
  }
`;

export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($input: CreateSequenceInput!) {
    createSequence(input: $input) {
      id
      name
    }
  }
`;

export const ADD_TEMPLATE_TO_SEQUENCE = gql`
  mutation AddTemplateToSequence($input: AddTemplateToSequenceInput!) {
    addTemplateToSequence(input: $input) {
      id
    }
  }
`;
