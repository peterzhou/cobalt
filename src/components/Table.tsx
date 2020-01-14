import styled from "@emotion/styled";
import * as React from "react";
import withShortcuts from "../shortcuts/withShortcuts";
import { ShortcutProps } from "../types";
import LoadingScreen from "./LoadingScreen";

type Props = {
  loading?: boolean;
  onClickHeader?: () => any;
  tableListing: (
    index: number,
    element: any,
    checked: boolean,
    focused: boolean,
    focusCurrentElement: () => any,
    toggleCheckbox: () => any,
  ) => any;
  onClickTableListing: (id: string) => any;
  tableArray: any[];
  currentPage: number;
  onNextPage: () => any;
  onPreviousPage: () => any;
  disableNext: boolean;
  disablePrevious: boolean;
  totalCount: number;
  elementName: string;
  notPaginated?: boolean;
} & ShortcutProps;

type State = {
  focusedIndex: number;
  selectedIndices: number[];
  focusedFilter: number;
};

class DashboardTable extends React.Component<Props, State> {
  state: State = {
    focusedFilter: 0,
    selectedIndices: [],
    focusedIndex: 0,
  };

  UNSAFE_componentWillMount() {
    this.props.manager.bind(
      "j",
      this.focusNextElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "k",
      this.focusPreviousElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind("tab", this.nextFilter, this.constructor.name, 1);
    this.props.manager.bind(
      "shift+tab",
      this.previousFilter,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "enter",
      this.props.onClickTableListing,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "shift+j",
      this.selectNextElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "shift+k",
      this.selectPreviousElement,
      this.constructor.name,
      1,
    );
    this.props.manager.bind(
      "space",
      this.selectCurrentElement,
      this.constructor.name,
      1,
    );
  }

  componentWillUnmount() {
    this.props.manager.unbind("j", this.constructor.name);
    this.props.manager.unbind("k", this.constructor.name);
    this.props.manager.unbind("tab", this.constructor.name);
    this.props.manager.unbind("shift+tab", this.constructor.name);
    this.props.manager.unbind("enter", this.constructor.name);
    this.props.manager.unbind("shift+j", this.constructor.name);
    this.props.manager.unbind("shift+k", this.constructor.name);
    this.props.manager.unbind("space", this.constructor.name);
  }

  focusNextElement = () => {
    if (this.state.focusedIndex >= this.props.totalCount - 1) {
      return;
    }
    this.setState({
      focusedIndex: this.state.focusedIndex + 1,
    });
  };

  focusPreviousElement = () => {
    if (this.state.focusedIndex === 0) {
      return;
    }
    this.setState({
      focusedIndex: this.state.focusedIndex - 1,
    });
  };

  selectNextElement = () => {
    let newSelectedList = this.state.selectedIndices;
    if (this.state.focusedIndex + 1 >= this.props.totalCount - 1) {
      return;
    }

    this.toggleSelectedIndex(this.state.focusedIndex + 1);

    this.setState({
      focusedIndex: this.state.focusedIndex + 1,
    });
  };

  selectPreviousElement = () => {
    let newSelectedList = this.state.selectedIndices;
    if (this.state.focusedIndex - 1 === 0) {
      return;
    }

    this.toggleSelectedIndex(this.state.focusedIndex - 1);

    this.setState({
      focusedIndex: this.state.focusedIndex - 1,
    });
  };

  selectCurrentElement = () => {
    this.toggleSelectedIndex(this.state.focusedIndex);
  };

  nextFilter = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      // TODO broken
      focusedFilter: (this.state.focusedFilter + 1) % 2,
      focusedIndex: 0,
    });
  };

  previousFilter = (event: KeyboardEvent) => {
    event.preventDefault();
    this.setState({
      // TODO broken
      focusedFilter: (this.state.focusedFilter + 1) % 2,
      focusedIndex: 0,
    });
  };

  toggleSelectedIndex = (index: number) => {
    if (
      this.state.selectedIndices.find((currentIndex) => {
        return currentIndex === index;
      }) !== undefined
    ) {
      this.setState({
        selectedIndices: this.state.selectedIndices.filter((selectedIndex) => {
          return selectedIndex !== index;
        }),
      });
    } else {
      let newList = this.state.selectedIndices;
      newList.push(index);
      this.setState({
        selectedIndices: newList,
      });
    }
  };

  onClickTableListing = () => {
    const id = this.props.tableArray[this.state.focusedIndex].id;
    this.props.onClickTableListing(id);
  };

  render() {
    const { tableArray } = this.props;
    const currentPage = this.props.currentPage ? this.props.currentPage : 0;

    const displayItems = this.props.notPaginated ? tableArray : tableArray;

    return (
      <TableContainer>
        <TableBody>
          <TableListings>
            {this.props.loading ? (
              <TableListingsBody>
                <LoadingScreen />
              </TableListingsBody>
            ) : (
              <TableListingsBody>
                {displayItems.map((element, index) => {
                  return this.props.tableListing(
                    index,
                    element,
                    this.state.selectedIndices.find((currentIndex) => {
                      return currentIndex === index;
                    }) !== undefined,
                    this.state.focusedIndex === index,
                    () => {
                      this.setState({
                        focusedIndex: index,
                      });
                    },
                    () => {
                      this.toggleSelectedIndex(index);
                    },
                  );
                })}
              </TableListingsBody>
            )}
          </TableListings>
        </TableBody>
        {!this.props.loading && (
          <TableFooter>
            <NumberOfRows>
              {"{"}start{"}"} - {"{"}finish{"}"} of {"{total}"}{" "}
              {"{elementName}"}
            </NumberOfRows>
            <PaginationSelector>
              <PaginationButton
                onClick={
                  !this.props.disablePrevious
                    ? this.props.onPreviousPage
                    : () => {}
                }
                disabled={this.props.disablePrevious}>
                Previous
              </PaginationButton>
              <PaginationButton
                onClick={
                  !this.props.disableNext ? this.props.onNextPage : () => {}
                }
                disabled={this.props.disableNext}>
                Next
              </PaginationButton>
            </PaginationSelector>
          </TableFooter>
        )}
      </TableContainer>
    );
  }
}

export default withShortcuts(DashboardTable);

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  flex-direction: column;
`;

const TableFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  color: rgb(97, 111, 196);
`;

const NumberOfRows = styled.div`
  margin-left: 40px;
  font-size: 14px;
`;

const PaginationSelector = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  margin-left: auto;
`;

const PaginationButton = styled.div<{ disabled: boolean }>((props: any) => {
  return {
    ...(!props.disabled && { cursor: "pointer" }),
    ...(props.disabled && { color: "rgb(166, 171, 175)" }),
    fontSize: "14px",
    "&:last-child": {
      marginLeft: "20px",
    },
  };
});

const TableBody = styled.div``;

const TableListings = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableListingsHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
`;

const HeaderClick = styled.div<{ onlyHeader: boolean; hasSelect: boolean }>`
  flex: 1;
  ${(props) => (!props.hasSelect ? "margin-left: 40px;" : "")}
  color: #b8b6b6;
  cursor: pointer;
  &:hover {
    color: rgb(97, 111, 196);
  }
  transition: 0.16s ease-in-out;
`;

const TableListingsBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
