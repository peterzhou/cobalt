import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";
import DashboardShell from "../components/DashboardShell";
import Contacts from "../contacts/Contacts";
import { CurrentUser } from "../graphql/generated/types";
import { CURRENT_USER } from "../graphql/queries";

class ContactsPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }: QueryResult<CurrentUser>) => {
          if (error || !data || !data.currentUser) {
            return <div>OK</div>;
          }
          return (
            <DashboardShell>
              <Contacts user={data.currentUser} />
            </DashboardShell>
          );
        }}
      </Query>
    );
  }
}

export default (ContactsPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
