import * as React from "react";

import { Mutation, MutationFunction, MutationResult } from "react-apollo";

import { ADD_GOOGLE_AUTH } from "../graphql/mutations";
import { CurrentUserWithGoogleAuth_currentUser } from "../graphql/generated/types";
import { shell } from "electron";
import styled from "@emotion/styled";

type Props = {
  user: CurrentUserWithGoogleAuth_currentUser;
};

type State = {};

export default class Settings extends React.Component<Props, State> {
  completeGoogleAuth = (data: any) => {
    console.log(data);
    console.log("MUTATION FINISHED");
    if (data.addGoogleAuth) {
      shell.openExternal(data.addGoogleAuth);
    }
  };

  render() {
    return (
      <Container>
        <div>
          {this.props.user.googleAuth ? "AUTHENTICATED" : "NOT AUTHENTICATED"}
        </div>
        <Mutation
          mutation={ADD_GOOGLE_AUTH}
          onCompleted={this.completeGoogleAuth}>
          {(addGoogleAuth: MutationFunction, { data }: MutationResult) => {
            return (
              <button
                onClick={() => {
                  addGoogleAuth();
                }}>
                Add google Auth
              </button>
            );
          }}
        </Mutation>
      </Container>
    );
  }
}

const Container = styled.div`
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
