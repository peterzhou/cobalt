import styled from "@emotion/styled";
import * as React from "react";
import Plus from "../components/icons/Plus";
import { Filter } from "../types";

type Props = {
  filters: Filter[];
  currentFilter: number;
};

type State = {};

class ContactsHeader extends React.Component<Props, State> {
  render() {
    return (
      <Header>
        {this.props.filters.map((filter, index) => {
          return (
            <Filter active={index === this.props.currentFilter}>
              {filter.name}
              <Count active={index === this.props.currentFilter}>
                {filter.count}
              </Count>
            </Filter>
          );
        })}
        <NewContactButton>
          <Plus />
        </NewContactButton>
      </Header>
    );
  }
}

export default ContactsHeader;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const Filter = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 30px;
  color: ${(props) =>
    props.active ? "rgb(255, 255, 255)" : "rgb(187, 188, 190)"};
`;

const Count = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? "rgb(127, 128, 130)" : "rgb(97, 98, 100)"};
  margin-left: 10px;
  font-size: 16px;
`;

const NewContactButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: auto;
  width: 30px;
  height: 30px;
  background-color: rgb(97, 111, 196);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(107, 121, 206);
  }
  transition: background-color 0.16s ease-in-out;
`;
