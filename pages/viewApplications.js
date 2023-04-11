// Brijesh + Evan

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

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

  return (
    <div className="viewApplications">
      <h1>Student Applicants</h1>
      <p>
        The table below displays information about students applying for a job,
        including their ID, name, email, major, and GPA.
      </p>
      <Box sx={{ width: "100%", overflowX: "auto", margin: "0 16px" }}>
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
      </Box>
    </div>
  );
};

export default viewApplications;
