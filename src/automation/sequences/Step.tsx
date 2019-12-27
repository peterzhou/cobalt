import styled from "@emotion/styled";
import * as React from "react";

type Props = {};

type State = {};

class Step extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <div>Hello</div>
      </Container>
    );
  }
}

export default Step;

const Container = styled.div``;
