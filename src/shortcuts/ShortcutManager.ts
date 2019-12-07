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
      this.activeShortcuts[sequence][className].callback = callback;
    }

    let maxPriority = 0;
    let classNameWithBestCallback = className;
    Object.keys(this.activeShortcuts[sequence]).forEach((className) => {
      if (
        this.activeShortcuts[sequence][className].count > 0 &&
        this.activeShortcuts[sequence][className].priority >= maxPriority
      ) {
        classNameWithBestCallback = className;
        maxPriority = this.activeShortcuts[sequence][className].priority;
      }
    });
    const bestCallback = this.activeShortcuts[sequence][className].callback;
    Mousetrap.bind(sequence, bestCallback);
  };

  unbind = (sequence: string, className: string) => {
    if (
      !this.activeShortcuts[sequence] ||
      !this.activeShortcuts[sequence][className]
    ) {
      return;
    }

    this.activeShortcuts[sequence][className].count -= 1;

    let maxPriority = 0;
    let classNameWithBestCallback = className;
    Object.keys(this.activeShortcuts[sequence]).forEach((className) => {
      if (
        this.activeShortcuts[sequence][className].count > 0 &&
        this.activeShortcuts[sequence][className].priority >= maxPriority
      ) {
        classNameWithBestCallback = className;
        maxPriority = this.activeShortcuts[sequence][className].priority;
      }
    });

    if (maxPriority) {
      const bestCallback = this.activeShortcuts[sequence][
        classNameWithBestCallback
      ].callback;
      Mousetrap.bind(sequence, bestCallback);
    } else {
      Mousetrap.unbind(sequence);
    }
  };

  updateCallback = (sequence: string, callback: any, className: string) => {
    this.activeShortcuts[sequence][className].callback = callback;
  };
}
