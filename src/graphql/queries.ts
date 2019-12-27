import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      contacts {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CURRENT_USER_WITH_CONTACT = gql`
  query CurrentUserWithContact($id: ID!) {
    currentUser {
      id
      email
      contact(id: $id) {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const CURRENT_USER_WITH_GOOGLE_AUTH = gql`
  query CurrentUserWithGoogleAuth {
    currentUser {
      id
      email
      googleAuth {
        accessToken
        refreshToken
        expiryDate
      }
    }
  }
`;

export const CURRENT_USER_WITH_SEQUENCE = gql`
  query CurrentUserWithSequence($id: ID!) {
    currentUser {
      id
      email
      sequence(id: $id) {
        id
        name
        steps {
          id
          index
          template {
            id
            name
            content
          }
        }
      }
    }
  }
`;

export const CURRENT_USER_WITH_AUTOMATION = gql`
  query CurrentUserWithAutomation {
    currentUser {
      id
      email
      sequences {
        id
        name
        steps {
          id
          index
          template {
            id
            content
          }
        }
      }
      templates {
        id
        name
        content
      }
    }
  }
`;
