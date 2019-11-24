export enum VIEWS {
  HOME = "HOME",
}

export type User = {
  id: string;
};

export type Domain = string;

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  company: Company | null;
};

export type Company = {
  id: string;
  name: string;
  domain: Domain;
};
