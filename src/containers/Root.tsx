import styled from "@emotion/styled";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import AuthPage from "../AuthPage";
import { getElectronState } from "../renderer/state";
import { getBackendUrl } from "../utils";
import ContactsPage from "./ContactsPage";
import HomePage from "./HomePage";

const client = new ApolloClient<InMemoryCache>({
  uri: getBackendUrl(),
  request: (operation) => {
    const { authToken } = getElectronState();
    const localStorageToken = localStorage.getItem("authToken");
    const useToken = authToken || localStorageToken;
    if (useToken) {
      operation.setContext({
        headers: {
          authorization: useToken ? `Bearer ${useToken}` : "",
        },
      });
    }
  },
});

export default function Root() {
  const { loggedIn } = window as any;

  if (!loggedIn) {
    return (
      <AppContainer>
        <ApolloProvider client={client}>
          <AuthPage />
        </ApolloProvider>
      </AppContainer>
    );
  }

  return (
    <MemoryRouter>
      <AppContainer>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/" component={HomePage} />
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
