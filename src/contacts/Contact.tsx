import styled from "@emotion/styled";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CurrentUserWithContact_currentUser } from "../graphql/generated/types";
import ContactActivityLog from "./ContactActivityLog";
import ContactProfile from "./ContactProfile";

type Props = {
  user: CurrentUserWithContact_currentUser;
} & RouteComponentProps;

type State = {};

class Contact extends React.Component<Props, State> {
  // TODO: Bug with Mousetrap not firing
  componentDidMount() {
    Mousetrap.bind("esc", this.redirectBack);
  }

  componentWillUnmount() {
    Mousetrap.unbind("esc");
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
        <ContactProfile contact={this.props.user.contact} />
        <ContactActivityLog contact={this.props.user.contact} />
      </Container>
    );
  }
}

export default withRouter(Contact);

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
