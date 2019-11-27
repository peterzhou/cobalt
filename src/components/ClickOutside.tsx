import * as React from "react";

type Props = {
  onClickOutside: () => void;
  style?: any;
};

export default class ClickOutside extends React.Component<Props> {
  wrapperRef: any;

  constructor(props: Props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    Mousetrap.bind("esc", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    Mousetrap.unbind("esc");
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
