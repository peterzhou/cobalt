import styled from "@emotion/styled";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation, MutationResult } from "react-apollo";
import ClipLoader from "react-spinners/ClipLoader";

const LOG_IN = gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

enum LOG_IN_ERRORS {
  BadPassword = "BadPassword",
  BadEmail = "BadEmail",
  MissingEmail = "MissingEmail",
}

type Props = {};

type State = {
  emailSignIn: boolean;
  error: LOG_IN_ERRORS | null;
  email: string;
  password: string;
  isLoading: boolean;
  googleSignupActive: boolean;
  gitHubSignupActive: boolean;
};

class Login extends React.Component<Props, State> {
  state: State = {
    emailSignIn: false,
    error: null,
    email: "",
    password: "",
    isLoading: false,
    googleSignupActive: false,
    gitHubSignupActive: false,
  };

  displayError = (error: any) => {
    this.setState({ isLoading: false });
    if (!this.state.email) {
      this.setState({
        error: LOG_IN_ERRORS.MissingEmail,
      });
    } else if (error.message.indexOf("Invalid password") > -1) {
      this.setState({
        error: LOG_IN_ERRORS.BadPassword,
      });
    } else if (error.message.indexOf("No user found for") > -1) {
      this.setState({
        error: LOG_IN_ERRORS.BadEmail,
      });
    }
  };

  setEmailSignIn = () => {
    this.setState({
      emailSignIn: true,
    });
  };

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value,
    });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value,
    });
  };

  onLoading = () => {
    this.setState({
      isLoading: true,
    });
  };

  validateFields = () => {
    return true;
  };

  render() {
    let errorMessage: any = null;
    switch (this.state.error) {
      case LOG_IN_ERRORS.MissingEmail:
        errorMessage = <ErrorMessage>You need to enter an email.</ErrorMessage>;
        break;
      case LOG_IN_ERRORS.BadEmail:
      case LOG_IN_ERRORS.BadPassword:
        errorMessage = <ErrorMessage>Invalid email or password.</ErrorMessage>;
        break;
    }

    const handleLoginSuccess = (data: any) => {
      console.log("TODO: Redirect");
    };

    return (
      <Mutation
        mutation={LOG_IN}
        onCompleted={handleLoginSuccess}
        onError={this.displayError}>
        {(login: any, { data }: MutationResult) => {
          const attemptLogin = () => {
            if (this.validateFields()) {
              login({
                variables: {
                  input: {
                    email: this.state.email,
                    password: this.state.password,
                  },
                },
              });
            }
          };

          const detectEnter = (event: React.KeyboardEvent) => {
            if (event.key == "Enter") {
              this.onLoading();
              attemptLogin();
            }
          };

          return (
            <Container>
              <title>Login - Lang</title>
              <meta name="description" content="Cobalt motherfucker" />
              <Break />
              <HeaderBar></HeaderBar>
              <Title>Welcome back.</Title>
              <SignInForm>
                <Input
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  onKeyPress={detectEnter}
                  placeholder="Email"
                />
                <Input
                  type="password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  onKeyPress={detectEnter}
                  placeholder="Password"
                />
                {errorMessage}
                <SignInButton
                  onClick={() => {
                    this.onLoading();
                    attemptLogin();
                  }}
                  active={this.state.isLoading}>
                  {this.state.isLoading ? (
                    <ClipLoader
                      size={20}
                      sizeUnit={"px"}
                      loading={true}
                      color="#9785f6"></ClipLoader>
                  ) : (
                    "Sign In"
                  )}
                </SignInButton>
              </SignInForm>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default Login;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 3;
`;

const ErrorMessage = styled.div`
  margin-top: auto;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 40px;
  width: 320px;
  background-color: rgb(235, 84, 84);
  border: 2px solid rgb(235, 84, 84);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
`;

const Break = styled.div`
  height: 20px;
`;

const SignInButton = styled.div<{ active: boolean }>((props) => {
  return {
    justifySelf: "flex-end",
    height: "40px",
    width: "320px",
    backgroundColor: props.active ? "#816EE3" : "#9785F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "20px",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    "&:active": {
      backgroundColor: "#816EE3",
    },
  } as any;
});

const Input = styled("input")`
  padding: 10px 12px;
  width: 300px;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
  border: 1px solid #bbb;
  border-top-color: #999;
  font-size: 18px;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 40px;
  margin-top: 24px;
  margin-bottom: 40px;
  color: #9785f6;
`;

const SignInForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  height: 270px;
  border-radius: 5px;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
  border: 1px solid rgb(228, 232, 237);
`;
const HeaderBar = styled.div`
  max-width: 1130px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 1100px;
  margin-top: 10px;
  @media (max-width: 1000px) {
    max-width: calc(100vh - 80px);
  }
`;
