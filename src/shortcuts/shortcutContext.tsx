import * as React from "react";
import ShortcutManager from "./ShortcutManager";

export type ShortcutContextType = {
  manager: ShortcutManager;
};

const ShortcutContext = React.createContext<ShortcutContextType>({
  manager: new ShortcutManager(),
});

export default ShortcutContext;
