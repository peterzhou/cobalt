import queryString from "query-string";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";
import Sequence from "../automation/sequences/Sequence";
import DashboardShell from "../components/DashboardShell";
import { CurrentUserWithSequence } from "../graphql/generated/types";
import { CURRENT_USER_WITH_SEQUENCE } from "../graphql/queries";
import { TAB } from "../types";

class SequencePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    const id = queryString.parse(this.props.location.search).id;

    if (!id) {
      return <div>TODO Error</div>;
    }
    return (
      <DashboardShell activeTab={TAB.AUTOMATION}>
        <Query query={CURRENT_USER_WITH_SEQUENCE} variables={{ id: id }}>
          {({ loading, error, data }: QueryResult<CurrentUserWithSequence>) => {
            if (error || !data || !data.currentUser) {
              return <div>TODO Error</div>;
            }
            return <Sequence user={data.currentUser} />;
          }}
        </Query>
      </DashboardShell>
    );
  }
}

export default (SequencePage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
