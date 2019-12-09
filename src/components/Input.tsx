// TODO: Finish

import styled from "@emotion/styled";
import * as React from "react";

type Shortcut = {
  keys: string[];
  callback: () => any;
};

type Props = {
  shortcuts: Shortcut[];
} & React.InputHTMLAttributes<HTMLInputElement>;

type State = {};

class InputWithShortcuts extends React.Component<Props, State> {
  map: any = {};

  checkShortcutFired = () => {
    this.props.shortcuts.forEach((shortcut) => {
      let fireShortcut = true;
      shortcut.keys.forEach((key) => {
        if (!this.map[key]) {
          fireShortcut = false;
        }
      });

      if (fireShortcut) {
        shortcut.callback();
      }
    });
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.map[event.key] = true;

    console.log(this.map);

    this.checkShortcutFired();
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.map[event.key] = false;

    console.log(this.map);

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };

  render() {
    return (
      <Input
        {...this.props}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}></Input>
    );
  }
}

export default InputWithShortcuts;

const Input = styled.input`
  font-size: 16px;
  -webkit-appearance: none;
  border: none;
  background-image: none;
  background-color: rgb(45, 47, 49);
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a0a0a0;
  }
  color: rgb(244, 244, 246);
`;
