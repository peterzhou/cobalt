import styled from "@emotion/styled";
import * as React from "react";

type Props = {};

type State = {};

export default class Person extends React.Component<Props, State> {
  render() {
    return (
      <Svg stroke-width="0" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </Svg>
    );
  }
}

const Svg = styled.svg`
  height: 20px;
  width: 20px;
  fill: rgb(187, 188, 190);
  margin-right: 10px;
`;
