import React, { useState, useMemo } from "react";
import { useTable } from "react-table";

// Brijesh + Evan

const viewApplications = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      major: "Computer Science",
      gpa: "3.8",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      major: "Information Systems",
      gpa: "3.6",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      major: "Software Engineering",
      gpa: "3.7",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Major",
        accessor: "major",
      },
      {
        Header: "GPA",
        accessor: "gpa",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="viewApplications">
      <h1>Student Applicants</h1>
      <table {...getTableProps()} style={{ border: "solid 1px black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px black",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
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
    </div>
  );
};

export default viewApplications