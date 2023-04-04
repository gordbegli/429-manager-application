import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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

  return (
    <div className="App">
      <h1>Student Applicants</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.major}</TableCell>
                <TableCell>{row.gpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};



export default viewApplications