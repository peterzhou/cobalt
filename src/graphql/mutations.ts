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
