import styled from "@emotion/styled";
import * as React from "react";
import ClickOutside from "../components/ClickOutside";
type Props = {
  onClickOutside: () => any;
};

type State = {
  search: string;
};

class CommandLine extends React.Component<Props, State> {
  commandLineInputRef = React.createRef<HTMLInputElement>();
  state: State = {
    search: "",
  };

  bubbleUpEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      this.props.onClickOutside();
    }
  };

  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <ClickOutside onClickOutside={this.props.onClickOutside}>
        <Container>
          <CommandLineDisplay>
            <CommandLineInput
              autoFocus
              ref={this.commandLineInputRef}
              placeholder="Start typing..."
              onKeyDown={this.bubbleUpEscape}
              onChange={this.updateSearch}
            />
          </CommandLineDisplay>
        </Container>
      </ClickOutside>
    );
  }
}

export default CommandLine;

const Container = styled.div`
  display: flex;
  align-self: center;
  position: absolute;
  left: calc(50% - 400px);
  top: 5%;
  margin: auto;
`;

const CommandLineDisplay = styled.div`
  width: 800px;
  height: 60px;
  background-color: rgba(42, 42, 46, 0.8);
  border-radius: 8px;
  display: flex;
  padding: 10px 20px 10px 20px;
`;

const CommandLineInput = styled.input`
  -webkit-appearance: none;
  border: none;
  background-image: none;
  background-color: transparent;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a0a0a0;
  }
  color: rgb(244, 244, 246);
  font-size: 24px;
  width: 100%;
`;
