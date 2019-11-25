import styled from "@emotion/styled";
import * as React from "react";
import LoadingScreen from "./LoadingScreen";

type Props = {
  loading?: boolean;
  attributes: string[];
  onClickHeader?: () => any;
  tableListing: (index: number, element: any) => any;
  tableArray: any[];
  currentPage: number;
  onNextPage: () => any;
  onPreviousPage: () => any;
  disableNext: boolean;
  disablePrevious: boolean;
  totalCount: number;
  elementName: string;
  notPaginated?: boolean;
};

function DashboardTable(props: Props) {
  const { tableArray } = props;
  const currentPage = props.currentPage ? props.currentPage : 0;

  const displayItems = props.notPaginated ? tableArray : tableArray;

  return (
    <TableContainer>
      <TableBody>
        <TableListings>
          {props.loading ? (
            <TableListingsBody>
              <LoadingScreen />
            </TableListingsBody>
          ) : (
            <TableListingsBody>
              {displayItems.map((element, index) => {
                return props.tableListing(index, element);
              })}
            </TableListingsBody>
          )}
        </TableListings>
      </TableBody>
      {!props.loading && (
        <TableFooter>
          <NumberOfRows>
            {"{"}start{"}"} - {"{"}finish{"}"} of {"{total}"} {"{elementName}"}
          </NumberOfRows>
          <PaginationSelector>
            <PaginationButton
              onClick={!props.disablePrevious ? props.onPreviousPage : () => {}}
              disabled={props.disablePrevious}>
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={!props.disableNext ? props.onNextPage : () => {}}
              disabled={props.disableNext}>
              Next
            </PaginationButton>
          </PaginationSelector>
        </TableFooter>
      )}
    </TableContainer>
  );
}

export default DashboardTable;

const CheckBox = styled.input`
  margin-left: 20px;
  margin-right: 10px;
  flex: none;
  transform: scale(1.2);
`;

const TableContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const TableFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  color: #9785f6;
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
    color: #9785f6;
  }
  transition: 0.16s ease-in-out;
`;

const TableListingsBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
