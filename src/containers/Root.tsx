import styled from "@emotion/styled";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import AuthPage from "../AuthPage";
import { getBackendUrl } from "../utils";
import ContactsPage from "./ContactsPage";
import HomePage from "./HomePage";

const client = new ApolloClient<InMemoryCache>({
  uri: getBackendUrl(),
  request: (operation) => {
    const localStorageToken = localStorage.getItem("authToken");
    if (localStorageToken) {
      operation.setContext({
        headers: {
          authorization: localStorageToken ? `Bearer ${localStorageToken}` : "",
        },
      });
    }
  },
});

export default function Root() {
  return (
    <MemoryRouter>
      <AppContainer>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/" component={AuthPage} />
          </Switch>
        </ApolloProvider>
      </AppContainer>
    </MemoryRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
`;
