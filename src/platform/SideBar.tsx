import styled from "@emotion/styled";
import * as React from "react";

type Props = {};

type State = {};

class SideBar extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <div>Hello</div>
      </Container>
    );
  }
}

export default SideBar;

const Container = styled.div`
  display: flex;
  height: 100%;
  min-width: 300px;
  background-color: rgb(30, 31, 34);
  border-left: 1px solid rgb(42, 44, 46);
`;
