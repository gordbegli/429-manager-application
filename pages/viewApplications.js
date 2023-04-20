// Brijesh + Evan

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ApplicantDetails from "./ApplicantDetails";
import { useRouter } from "next/router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#990000", // UMass Red
    },
    background: {
      default: "#ffffff",
    },
  },
});

const handleRowClick = (applicant) => {
  router.push(`./application/${applicant.id}`);
};

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
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">UMass Amherst</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h2">Applicants</Typography>
          <TableContainer>
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
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id} onClick={() => handleRowClick(row)}>
                    <TableCell>{applicant.id}</TableCell>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.major}</TableCell>
                    <TableCell>{applicant.gpa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default viewApplications;
