import styled from "@emotion/styled";
import * as React from "react";

type Props = {};

type State = {};

class Plus extends React.Component<Props, State> {
  render() {
    return (
      <Svg x="0px" y="0px" viewBox="0 0 448 448">
        <path d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0" />
      </Svg>
    );
  }
}

export default Plus;

const Svg = styled.svg`
  height: 12px;
  width: 12px;
  fill: rgb(30, 31, 35);
`;
