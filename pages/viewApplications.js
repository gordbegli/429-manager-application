// Brijesh + Evan

import React, { useState, useEffect  } from "react";
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

import Header from "../components/Header"

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


const viewApplications = () => {
  const router = useRouter()
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApplicants();
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (applicant) => {
    router.push(`./ApplicantDetails?id=${applicant.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default viewApplications;
