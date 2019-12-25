import styled from "@emotion/styled";
import * as React from "react";
import { CurrentUserWithSequence_currentUser } from "../../graphql/generated/types";

type Props = {
  user: CurrentUserWithSequence_currentUser;
};

type State = {};

class Sequence extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <div>Hello</div>
      </Container>
    );
  }
}

export default Sequence;

const Container = styled.div``;
