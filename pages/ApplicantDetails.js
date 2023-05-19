import React, { useState, useEffect } from "react";
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

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const fetchApplicants = async () => {
  try {
    const studentApplicationsRef = query(collection(projectFirestore, "studentApplications"));
    const snapshot = await getDocs(studentApplicationsRef);

    const applicants = snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    console.log(applicants)
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

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
          <Typography style={{ marginTop: '20px' }} variant="h4">Applicant Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="ID:" secondary={applicant ? applicant.id : 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Name:" secondary={applicant ? applicant.firstName + " " + applicant.lastName : 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email:" secondary={applicant ? applicant.email : 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="GPA:" secondary={applicant ? applicant.gpa : 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Year:" secondary={applicant ? applicant.year : 'Loading...'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Class Sections Applied To:" secondary={applicant ? applicant.rankings.join(', ') : 'Loading...'} />
            </ListItem>
            <ListItem>
              <Box mb={1}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">Why I'm interested in taking 429:</Typography>
                <Typography variant="body2">{applicant ? applicant.whyInterested : 'Loading...'}</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">Transcript:</Typography>
            </ListItem>
          </List>
          <div style={{ height: '750px', width: '1000px', marginLeft: '50px' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={applicant ? applicant.transcriptURL : "https://mag.wcoomd.org/uploads/2018/05/blank.pdf"} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ApplicantDetails;
