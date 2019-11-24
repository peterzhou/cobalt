import styled from "@emotion/styled";
import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import ContactsPage from "./ContactsPage";
import HomePage from "./HomePage";

export default function Root() {
  return (
    <MemoryRouter>
      <AppContainer>
        <Switch>
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </AppContainer>
    </MemoryRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
`;
