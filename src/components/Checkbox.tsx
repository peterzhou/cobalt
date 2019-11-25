import * as React from "react";
import styled from "styled-components";
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: any) =>
    props.checked ? "rgb(50, 51, 55)" : "rgb(30, 31, 35)"};
  border-radius: 3px;
  transition: all 30ms;
  border: 1px solid rgb(50, 51, 55);

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;

const Checkbox = ({ checked, onChange }: any) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} type="checkbox" />
      <StyledCheckbox
        checked={checked}
        onClick={(event) => {
          onChange();
          event.preventDefault();
        }}></StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
