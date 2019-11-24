import * as React from "react";
import { RouteComponentProps } from "react-router";
import DashboardShell from "../components/DashboardShell";
import Contacts from "../contacts/Contacts";

class ContactsPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <DashboardShell>
        <Contacts />
      </DashboardShell>
    );
  }
}

export default (ContactsPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
