/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const defaultPropGetter = () => ({});

export default function ProjectsTable({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  return (
    <StyledProjectsTable>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledProjectsTable>
  );
}

const StyledProjectsTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  table td,
  table th {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }
  table th {
    background: lightgray;
  }
`;
