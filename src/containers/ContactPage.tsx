import * as queryString from "query-string";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";
import DashboardShell from "../components/DashboardShell";
import Contact from "../contacts/Contact";
import { CurrentUserWithContact } from "../graphql/generated/types";
import { CURRENT_USER_WITH_CONTACT } from "../graphql/queries";
import { TAB } from "../types";

class ContactPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    const id = queryString.parse(this.props.location.search).id;

    if (!id) {
      return <div>TODO Error</div>;
    }
    return (
      <DashboardShell activeTab={TAB.CONTACTS}>
        <Query query={CURRENT_USER_WITH_CONTACT} variables={{ id: id }}>
          {({ loading, error, data }: QueryResult<CurrentUserWithContact>) => {
            if (error || !data || !data.currentUser) {
              return <div>TODO Error</div>;
            }

            return <Contact user={data.currentUser} />;
          }}
        </Query>
      </DashboardShell>
    );
  }
}

export default (ContactPage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
