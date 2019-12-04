import * as React from "react";

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { MemoryRouter, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import AuthPage from "../AuthPage";
import ContactPage from "./ContactPage";
import ContactsPage from "./ContactsPage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import { getBackendUrl } from "../utils";
import styled from "@emotion/styled";

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
            <Route path="/settings" component={SettingsPage} />
            <Route path="/contact" component={ContactPage} />
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
