import styled from "@emotion/styled";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import AuthPage from "../AuthPage";
import ShortcutContext from "../shortcuts/shortcutContext";
import ShortcutManager from "../shortcuts/ShortcutManager";
import { getBackendUrl } from "../utils";
import ContactPage from "./ContactPage";
import ContactsPage from "./ContactsPage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";

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
  const shortcutManager = new ShortcutManager();
  return (
    <MemoryRouter>
      <AppContainer>
        <ShortcutContext.Provider value={{ manager: shortcutManager }}>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/settings" component={SettingsPage} />
              <Route path="/contacts" component={ContactsPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/home" component={HomePage} />
              <Route path="/" component={AuthPage} />
            </Switch>
          </ApolloProvider>
        </ShortcutContext.Provider>
      </AppContainer>
    </MemoryRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
`;
