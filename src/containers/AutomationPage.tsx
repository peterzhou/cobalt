import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";
import Automation from "../automation/Automation";
import DashboardShell from "../components/DashboardShell";
import { CurrentUserWithAutomation } from "../graphql/generated/types";
import { CURRENT_USER_WITH_AUTOMATION } from "../graphql/queries";
import { TAB } from "../types";

class AutomationPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <DashboardShell activeTab={TAB.AUTOMATION}>
        <Query query={CURRENT_USER_WITH_AUTOMATION}>
          {({
            loading,
            error,
            data,
          }: QueryResult<CurrentUserWithAutomation>) => {
            if (error || !data || !data.currentUser) {
              return <div>TODO Error</div>;
            }
            return <Automation user={data.currentUser} />;
          }}
        </Query>
      </DashboardShell>
    );
  }
}

export default (AutomationPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
