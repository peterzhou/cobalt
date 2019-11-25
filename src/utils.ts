import { getElectronState } from "./renderer/state";

const state = getElectronState();

export function getBackendUrl() {
  return state && state.isProd ? "TODO" : "http://localhost:4000";
}

export function getFrontendUrl() {
  return state && state.isProd ? "TODO" : "http://localhost:3001";
}
