import Mousetrap from "mousetrap";

// The ordering of componentDid/WillMount and componentWillUnmount is asynchronous and not guaranteed,
// so we need an async ShortcutManager to determine what keyboard shortcuts to display where

type ActiveShortcuts = {
  [sequence: string]: {
    [className: string]: {
      priority: number;
      count: number;
      callback: any;
    };
  };
};

export default class ShortcutManager {
  activeShortcuts: ActiveShortcuts = {};

  bind = (
    sequence: string,
    callback: any,
    className: string,
    priority: number,
  ) => {
    if (!this.activeShortcuts[sequence]) {
      this.activeShortcuts[sequence] = {};
    }

    if (!this.activeShortcuts[sequence][className]) {
      this.activeShortcuts[sequence][className] = {
        priority: priority,
        count: 1,
        callback: callback,
      };
    } else {
      this.activeShortcuts[sequence][className].count += 1;
    }
    Mousetrap.bind(sequence, callback);
  };

  unbind = (sequence: string, className: string) => {
    // if (
    //   !this.activeShortcuts[sequence] ||
    //   !this.activeShortcuts[sequence][className]
    // ) {
    //   return;
    // }
    Mousetrap.unbind(sequence);
  };
}
