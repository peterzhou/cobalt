import * as React from "react";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
type Props = {
  onClickOutside: () => void;
  style?: any;
} & ShortcutProps;

class ClickOutside extends React.Component<Props> {
  wrapperRef: any;

  constructor(props: Props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.manager.bind("esc", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    this.props.manager.unbind("esc");
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default withShortcuts(ClickOutside);
