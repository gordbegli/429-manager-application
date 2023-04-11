import React from "react";
import { useParams } from "react-router-dom";
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

const ApplicantDetails = ({ applicants }) => {
  const { id } = useParams();
  const applicant = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    major: "Computer Science",
    gpa: "3.8",
    whyRightForJob:
      "I have a strong background in computer science and have worked on multiple projects.",
    whyJobRightForMe:
      "This job will provide me with the opportunity to further develop my skills and work on challenging projects.",
  };

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

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
          <Typography variant="h1">{applicant.name}</Typography>
          <Typography variant="h2">Applicant Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="ID" secondary={applicant.id} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Name" secondary={applicant.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={applicant.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Major" secondary={applicant.major} />
            </ListItem>
            <ListItem>
              <ListItemText primary="GPA" secondary={applicant.gpa} />
            </ListItem>
          </List>
          <Box mb={1}>
            <Typography variant="h2">Why I think I'm right for the job</Typography>
            <Typography variant="body1">{applicant.whyRightForJob}</Typography>
          </Box>
          <Box>
            <Typography variant="h2">Why the job is right for me</Typography>
            <Typography variant="body1">{applicant.whyJobRightForMe}</Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ApplicantDetails;
