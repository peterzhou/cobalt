import * as React from "react";
import { ShortcutProps } from "../types";
import ShortcutContext from "./shortcutContext";
import ShortcutManager from "./ShortcutManager";

const ShortcutProvider = <P extends object>(App: React.ComponentType<P>) => {
  type WrappedComponentPropsExceptProvided = Exclude<
    keyof P,
    keyof ShortcutProps
  >;
  type ForwardedProps = Pick<P, WrappedComponentPropsExceptProvided>;
  return class AppWithShortcuts extends React.Component<ForwardedProps> {
    manager: ShortcutManager;

    constructor(props: P) {
      super(props);
      this.manager = new ShortcutManager();
    }

    render() {
      return (
        <ShortcutContext.Provider
          value={{
            manager: this.manager,
          }}>
          <App {...(this.props as P)} manager={this.manager} />
        </ShortcutContext.Provider>
      );
    }
  };
};

export default ShortcutProvider;
