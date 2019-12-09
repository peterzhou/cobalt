import ShortcutManager from "./shortcuts/ShortcutManager";

export enum TAB {
  HOME = "HOME",
  CONTACTS = "CONTACTS",
  SETTINGS = "SETTINGS",
  AUTOMATION = "AUTOMATION",
}

export type ShortcutProps = {
  manager: ShortcutManager;
};

export type User = {
  id: string;
};

export type Domain = string;

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  company: Company | null;
  assignee: User | null;
};

export type Company = {
  id: string;
  name: string;
  domain: Domain;
};

export type Filter = {
  id: string;
  user: User | null;
  name: string;
  count: number;
};

export enum CREATE_CONTACT_ERROR {
  EMAIL = "EMAIL",
}

export enum SEND_DRAFT_ERROR {
  EMAIL = "EMAIL",
}
