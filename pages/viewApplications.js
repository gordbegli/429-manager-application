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
import database from "./firebase";
import { ref, onValue, child } from "firebase/database";
import { useRouter } from "next/router";
import { projectFirestore } from "./firebase.js";
import { doc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

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

  const fetchApplicants = async () => {
    try {
        const studentApplicationsRef = query(collection(projectFirestore, "studentApplications"));
        const snapshot = await getDocs(studentApplicationsRef);
  
      const applicants = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
  
      return applicants;
    } catch (error) {
      console.error("Error fetching applicants data:", error);
      throw error;
    }
  };

  const viewApplications = () => {
    const router = useRouter();
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
      <Header/>
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