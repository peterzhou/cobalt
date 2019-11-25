import styled from "@emotion/styled";
import * as React from "react";
import Login from "./LogIn";
import SignUp from "./SignUp";

type Props = {};

type State = {
  isLoginPage: boolean;
};

class AuthPage extends React.Component<Props, State> {
  state: State = {
    isLoginPage: false,
  };

  setToLogIn = () => {
    this.setState({
      isLoginPage: true,
    });
  };

  setToSignUp = () => {
    this.setState({
      isLoginPage: false,
    });
  };

  render() {
    return (
      <Container>
        {this.state.isLoginPage ? <Login /> : <SignUp />}
        {this.state.isLoginPage ? (
          <ForgotPasswordLink onClick={this.setToSignUp}>
            Need an Account? Sign up!
          </ForgotPasswordLink>
        ) : (
          <SignInLink>
            Already have an account? &nbsp;
            <a onClick={this.setToLogIn}>Log in</a>.
          </SignInLink>
        )}
      </Container>
    );
  }
}

export default AuthPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SignInLink = styled.div`
  margin-top: 15px;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ForgotPasswordLink = styled.div`
  margin-top: 8px;
  color: #a0a0a0;
  cursor: pointer;
  :hover {
    color: #9785f6;
  }
`;
