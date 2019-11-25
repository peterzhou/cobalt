import * as isDev from "electron-is-dev";
import * as store from "electron-json-storage";

type ElectronState = {
  isProd: boolean;
  authToken?: string;
};

export function initElectronStateOnWindow() {
  console.log("Initialized electron state");
  // Setup auth info
  store.get("authToken", (error, data) => {
    console.log(data);
    (window as any).electron = {
      isProd: !isDev,
      authToken: (data as any).authToken,
    } as ElectronState;
  });
}

export function getElectronState(): ElectronState {
  return (window as any).electron;
}

// Run as soon as this file is loaded
initElectronStateOnWindow();

export default (window as any).electron;
