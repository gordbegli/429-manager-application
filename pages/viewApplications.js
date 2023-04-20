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
import ApplicantDetails from "./ApplicantDetails";
import { useRouter } from "next/router";

const viewApplications = () => {
  const router = useRouter()
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      major: "Computer Science",
      gpa: "3.8",
      whyRightForJob: "I have a strong background in computer science and have worked on multiple projects.",
      whyJobRightForMe: "This job will provide me with the opportunity to further develop my skills and work on challenging projects.",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      major: "Information Systems",
      gpa: "3.6",
      whyRightForJob: "I have experience in information systems and a passion for problem-solving.",
      whyJobRightForMe: "The job aligns with my career goals and allows me to work with cutting-edge technologies.",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      major: "Software Engineering",
      gpa: "3.7",
      whyRightForJob: "I have a solid foundation in software engineering and have completed internships in the field.",
      whyJobRightForMe: "The job will enable me to work with a talented team and contribute to meaningful projects.",
    },
  ]);

  const handleRowClick = (applicant) => {
    router.push(`./application/${applicant.id}`);
  };

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
              {applicants.map((row) => (
                <TableRow key={row.id} onClick={() => handleRowClick(row)}>
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
