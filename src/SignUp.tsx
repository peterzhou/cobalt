import styled from "@emotion/styled";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation, MutationResult } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getFrontendUrl, validateEmail } from "./utils";

type Props = {} & RouteComponentProps;

type State = {
  email: string;
  password: string;
  fullName: string;
  agreeToTerms: boolean;
  error: SIGN_UP_ERRORS | null;
  isLoading: Boolean;
};

const CREATE_USER = gql`
  mutation CreateUser($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

enum SIGN_UP_ERRORS {
  DuplicateEmail = "DuplicateEmail",
  BadEmail = "BadEmail",
  BadPassword = "BadPassword",
  DisagreeTerms = "DisagreeTerms",
  Company = "Company",
  FullName = "FullName",
}

class SignUp extends React.Component<Props, State> {
  state: State = {
    email: (this.props as any).email ? (this.props as any).email : "",
    fullName: "",
    password: "",
    agreeToTerms: false,
    error: null,
    isLoading: false,
  };

  onLoading = () => {
    this.setState({
      isLoading: true,
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

  onFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  onAgreeToTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      agreeToTerms: !this.state.agreeToTerms,
    });
  };

  openTermsOfService = () => {
    window.open(getFrontendUrl() + "/terms");
  };

  openPrivacyPolicy = () => {
    window.open(getFrontendUrl() + "/privacypolicy");
  };

  printError = (error: any) => {
    this.setState({ isLoading: false });
    if (
      error.message.indexOf(
        "GraphQL error: A unique constraint would be violated on User. Details: Field name = email",
      ) != -1
    ) {
      this.setState({
        error: SIGN_UP_ERRORS.DuplicateEmail,
      });
    }
  };

  validateFields = (): boolean => {
    if (this.state.fullName == "") {
      this.setState({
        error: SIGN_UP_ERRORS.FullName,
      });
      return false;
    }
    if (this.state.email == "" || !validateEmail(this.state.email)) {
      this.setState({
        error: SIGN_UP_ERRORS.BadEmail,
      });
      return false;
    }

    if (this.state.password == "" || this.state.password.length < 8) {
      this.setState({
        error: SIGN_UP_ERRORS.BadPassword,
      });
      return false;
    }
    if (!this.state.agreeToTerms) {
      this.setState({
        error: SIGN_UP_ERRORS.DisagreeTerms,
      });
      return false;
    }

    return true;
  };

  public render() {
    let errorMessage: any = null;
    switch (this.state.error) {
      case SIGN_UP_ERRORS.FullName:
        errorMessage = (
          <ErrorMessage>You need to include your full name.</ErrorMessage>
        );
        break;
      case SIGN_UP_ERRORS.BadEmail:
        errorMessage = (
          <ErrorMessage>You have an incorrectly formatted email.</ErrorMessage>
        );
        break;
      case SIGN_UP_ERRORS.DuplicateEmail:
        errorMessage = (
          <ErrorMessage>That email is already registered.</ErrorMessage>
        );
        break;
      case SIGN_UP_ERRORS.BadPassword:
        errorMessage = (
          <ErrorMessage>
            Password needs to be at least 8 characters.
          </ErrorMessage>
        );
        break;
      case SIGN_UP_ERRORS.DisagreeTerms:
        errorMessage = (
          <ErrorMessage>You need to agree to the terms.</ErrorMessage>
        );
        break;

      case SIGN_UP_ERRORS.Company:
        errorMessage = (
          <ErrorMessage>You need to include a company.</ErrorMessage>
        );
        break;
    }

    const handleCompleted = async (data: any) => {
      if (data.signup && data.signup.token) {
        localStorage.setItem("authToken", data.signup.token as any);
        this.props.history.push("/home");
      }
    };

    return (
      <Mutation
        mutation={CREATE_USER}
        onCompleted={handleCompleted}
        onError={this.printError}>
        {(signup: any, { loading }: MutationResult) => {
          const detectEnter = (event: React.KeyboardEvent) => {
            if (event.key === "Enter") {
              signup({
                variables: {
                  input: {
                    fullName: this.state.fullName,
                    email: this.state.email,
                    password: this.state.password,
                  },
                },
              });
            }
          };

          return (
            <Container>
              <HeaderBar></HeaderBar>

              <Break />
              <Title>Welcome aboard.</Title>
              <SignUpForm>
                <LoginRow>
                  <LoginColumn>
                    <LoginHeader>Full Name</LoginHeader>
                    <LoginHeader>Email</LoginHeader>
                    <LoginHeader>Password</LoginHeader>
                  </LoginColumn>
                  <LoginColumn>
                    <Input
                      value={this.state.fullName}
                      onChange={this.onFullNameChange}
                      onKeyPress={detectEnter}
                      placeholder="Bookity Bookface"
                    />
                    <Input
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      onKeyPress={detectEnter}
                      placeholder="books@bookapi.co"
                    />
                    <Input
                      type="password"
                      value={this.state.password}
                      onChange={this.onPasswordChange}
                      onKeyPress={detectEnter}
                      placeholder="**********"
                    />
                  </LoginColumn>
                </LoginRow>
                <TermsHolder>
                  <input type="checkbox" onChange={this.onAgreeToTermsChange} />
                  <TermsStatement>
                    I agree to the <a href="www.facebook.com">Privacy policy</a>{" "}
                    and <a href="facebook.com">Terms of Service</a>.
                  </TermsStatement>
                </TermsHolder>
                {errorMessage}
                <SignUpButton
                  active={this.state.isLoading}
                  onClick={() => {
                    if (this.validateFields()) {
                      this.onLoading();
                      signup({
                        variables: {
                          input: {
                            fullName: this.state.fullName,
                            email: this.state.email,
                            password: this.state.password,
                          },
                        },
                      });
                    }
                  }}>
                  {this.state.isLoading ? (
                    <ClipLoader
                      size={20}
                      sizeUnit={"px"}
                      loading={true}
                      color="#9785f6"></ClipLoader>
                  ) : (
                    "Sign Up"
                  )}
                </SignUpButton>
              </SignUpForm>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(SignUp);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 3;
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

const ErrorMessage = styled.div`
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
  margin-top: auto;
  margin-bottom: 10px;
`;

const LoginRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const TermsStatement = styled.div`
  margin-left: 4px;
  font-size: 12px;
  color: #a0a0a0;
`;

const TermsHolder = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Break = styled.div`
  height: 20px;
`;

const SignUpButton = styled.div`
  justify-self: flex-end;
  height: 40px;
  width: 320px;
  background-color: ${(props: any) => (props.active ? "#816EE3" : "#9785f6")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 20px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  &:active: {
    backgroundcolor: #816ee3;
  }
`;

const Input = styled("input")`
  padding: 10px 12px;
  width: 250px;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
  border: 1px solid #bbb;
  border-top-color: #999;
  font-size: 14px;
  margin-top: 20px;
`;

const SubTitle = styled.div`
  font-size: 15px;
  margin-bottom: 20px;
`;

const LoginHeader = styled.div`
  font-size: 15px;
  height: 25px;
  margin-top: 30px;
`;
const LoginColumn = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 40px;
  margin-top: 24px;
  margin-bottom: 20px;
  color: #9785f6;
`;

const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  border-radius: 5px;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.07);
  border: 1px solid rgb(228, 232, 237);
`;
