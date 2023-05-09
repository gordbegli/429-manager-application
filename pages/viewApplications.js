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
import database from "./firebase";
import { ref, onValue } from "firebase/database";

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

async function getServerSideProps() {
  const ref = database.ref('/studentApplications');

  try {
    const snapshot = await ref.once('value');
    const data = snapshot.val();

    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {},
    };
  }
}
/*
const fetchApplicants = async () => {
  return new Promise((resolve, reject) => {
    const applicantsRef = ref(database, "/studentApplications");
    onValue(
      applicantsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        // Create applicants array
        const applicants = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        resolve(applicants);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
*/

const viewApplications = () => {
  const router = useRouter()
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("here")
        const data = await getServerSideProps();
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
