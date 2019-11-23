import styled from "@emotion/styled";
import * as React from "react";

export default class App extends React.Component {
  render() {
    return <AppContainer>{this.props.children}</AppContainer>;
  }
}

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
`;
