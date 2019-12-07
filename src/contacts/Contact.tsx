import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CurrentUserWithContact_currentUser } from "../graphql/generated/types";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import ContactActivityLog from "./ContactActivityLog";
import ContactProfile from "./ContactProfile";

type Props = {
  user: CurrentUserWithContact_currentUser;
} & RouteComponentProps &
  ShortcutProps;

type State = {};

class Contact extends React.Component<Props, State> {
  // TODO: Bug with Mousetrap not firing
  componentWillMount() {
    this.props.manager.bind("esc", this.redirectBack, this.constructor.name, 1);
  }

  componentWillUnmount() {
    this.props.manager.unbind("esc", this.constructor.name);
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (!this.props.user.contact) {
      return <div>TODO Error</div>;
    }
    return (
      <Container>
        <ContactActivityLog contact={this.props.user.contact} />
        <ContactProfile contact={this.props.user.contact} />
      </Container>
    );
  }
}

export default withRouter(withShortcuts(Contact));

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
