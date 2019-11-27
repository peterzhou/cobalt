import * as isDev from "electron-is-dev";
import * as store from "electron-json-storage";

type ElectronState = {
  isProd: boolean;
  authToken?: string;
};

export function initElectronStateOnWindow() {
  // Setup auth info
  store.get("authToken", (error, data) => {
    (window as any).electron = {
      isProd: !isDev,
      authToken: (data as any).authToken,
    } as ElectronState;
  });
}

export function getElectronState(): ElectronState {
  return (window as any).electron;
}

export async function getFromStore(key: string) {
  return new Promise<any>((resolve, reject) => {
    store.get(key, (error, data) => {
      if (error) {
        reject(error);
      } else if (!data) {
        resolve(null);
      }

      // Check if data is {}
      if (Object.entries(data).length === 0 && data.constructor === Object) {
        resolve(null);
      }

      resolve(data);
    });
  });
}

export async function setToStore(key: string, value: any) {
  return new Promise<null>((resolve, reject) => {
    store.set(key, value, (error) => {
      if (error) {
        reject(error);
      }
      resolve(null);
    });
  });
}

// Run as soon as this file is loaded
initElectronStateOnWindow();

export default (window as any).electron;
