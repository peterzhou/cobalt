import { getElectronState } from "./renderer/state";

const state = getElectronState();

export function getBackendUrl() {
  return state && state.isProd ? "TODO" : "http://localhost:4000";
}

export function getFrontendUrl() {
  return state && state.isProd ? "TODO" : "http://localhost:3001";
}

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
