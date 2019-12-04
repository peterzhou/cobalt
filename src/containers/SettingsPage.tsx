import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { CURRENT_USER_WITH_GOOGLE_AUTH } from "../graphql/queries";
import { CurrentUserWithGoogleAuth } from "../graphql/generated/types";
import DashboardShell from "../components/DashboardShell";
import { RouteComponentProps } from "react-router";
import Settings from "../settings/Settings";
import { TAB } from "../types";

class ContactsPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <DashboardShell activeTab={TAB.SETTINGS}>
        <Query query={CURRENT_USER_WITH_GOOGLE_AUTH}>
          {({
            loading,
            error,
            data,
          }: QueryResult<CurrentUserWithGoogleAuth>) => {
            if (error || !data || !data.currentUser) {
              return <div>TODO Error</div>;
            }
            return <Settings user={data.currentUser} />;
          }}
        </Query>
      </DashboardShell>
    );
  }
}

export default (ContactsPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
