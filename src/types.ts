export enum TAB {
  HOME = "HOME",
  CONTACTS = "CONTACTS",
  SETTINGS = "SETTINGS",
  AUTOMATION = "AUTOMATION",
}

export type ShortcutProps = {
  manager: any;
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
