import Mousetrap from "mousetrap";

export default class ShortcutManager {
  activeShortcuts: any = {};

  bind = (sequence: string, callback: any) => {
    this.activeShortcuts[sequence] = true;
    console.log("OK");
    Mousetrap.bind(sequence, callback);
  };

  unbind = (sequence: string) => {
    this.activeShortcuts[sequence] = false;
    console.log("NOK");
    Mousetrap.unbind(sequence);
  };
}
