import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { doc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { projectFirestore } from "./firebase.js";

import Header from "../components/Header"

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

const ApplicantDetails = () => {
  const [applicants, setApplicants] = useState([]);
  const [applicant, setApplicant] = useState(null);
  
  const router = useRouter();
  const { id } = router.query

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

  useEffect(() => {
    if (applicants.length > 0 && id) {
      const applicantData = applicants.find(applicant => applicant.id === id);
      setApplicant(applicantData);
    }
    
  }, [applicants, id]);

  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Container>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h2">Applicant Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={applicant ? applicant.id: 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Name" secondary={applicant ? applicant.firstName + " " + applicant.lastName: 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={applicant ? applicant.email: 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Year" secondary={applicant ? applicant.year: 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="GPA" secondary={applicant ? applicant.gpa: 'Loading...'} />
            </ListItem>
            <ListItem>
              <Box mb={1}>
                <Typography variant="h4">Why I'm interested in taking 429</Typography>
                <Typography variant="body1">{applicant ? applicant.whyInterested: 'Loading...'}</Typography>
              </Box>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ApplicantDetails;
