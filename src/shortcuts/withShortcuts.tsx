import hoistNonReactStatics from "hoist-non-react-statics";
import * as React from "react";
import { ShortcutProps } from "../types";
import ShortcutContext, { ShortcutContextType } from "./ShortcutContext";

const withShortcuts = <P extends object>(Component: React.ComponentType<P>) => {
  type WrappedComponentPropsExceptProvided = Exclude<
    keyof P,
    keyof ShortcutProps
  >;
  type ForwardedProps = Pick<P, WrappedComponentPropsExceptProvided>;
  return hoistNonReactStatics(
    class LangWrapperComponent extends React.Component<ForwardedProps> {
      render() {
        return (
          <ShortcutContext.Consumer>
            {(ShortcutContext: ShortcutContextType) => {
              const { manager } = ShortcutContext;
              return <Component {...(this.props as P)} manager={manager} />;
            }}
          </ShortcutContext.Consumer>
        );
      }
    },
    Component,
  );
};

export default withShortcuts;
