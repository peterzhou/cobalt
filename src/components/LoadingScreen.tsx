import styled from "@emotion/styled";
import * as React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {};

type State = {};

export default class LoadingScreen extends React.Component<Props, State> {
  render() {
    return (
      <LoaderContainer>
        <ClipLoader
          size={20}
          sizeUnit={"px"}
          loading={true}
          color="#9785f6"></ClipLoader>
      </LoaderContainer>
    );
  }
}

const LoaderContainer = styled.div`
  padding-top: 20%;
  padding-bottom: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
