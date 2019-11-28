import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";
import DashboardShell from "../components/DashboardShell";
import Contacts from "../contacts/Contacts";
import { CurrentUser } from "../graphql/generated/types";
import { CURRENT_USER } from "../graphql/queries";
import { TAB } from "../types";

class ContactsPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <DashboardShell activeTab={TAB.CONTACTS}>
        <Query query={CURRENT_USER}>
          {({ loading, error, data }: QueryResult<CurrentUser>) => {
            if (error || !data || !data.currentUser) {
              return <div>TODO Error</div>;
            }
            return <Contacts user={data.currentUser} />;
          }}
        </Query>
      </DashboardShell>
    );
  }
}

export default (ContactsPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
