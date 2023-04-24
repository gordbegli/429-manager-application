import * as React from 'react';
import { useState } from 'react';
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  IconButton,
  Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import BasicInfoForm from '../components/BasicInfoForm';
import ClassRankingForm from '../components/ClassRankingForm';
import Review from '../components/Review';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0AzLHh3DTJE-a8X_g3hRw5yiIlt4a-xI",
  authDomain: "manager-project-test.firebaseapp.com",
  projectId: "manager-project-test",
  storageBucket: "manager-project-test.appspot.com",
  messagingSenderId: "819743335708",
  appId: "1:819743335708:web:8ae32ea4c0b14089b006d9",
  measurementId: "G-BEDYS7M6VS"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const steps = ['Basic Info', 'Class Ranking', 'Review'];

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

export default function fillApplication() {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfoFormData, setBasicInfoFormData] = useState({});
  const [classRankingFormData, setClassRankingFormData] = useState([]);

  const handleBasicFormData = (data) => {
    console.log(data);
    setBasicInfoFormData(data);
  }

  const handleClassRankingData = (data) => {
    setClassRankingFormData(data);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicInfoForm onFormDataChange={handleBasicFormData}/>;
      case 1:
        return <ClassRankingForm onFormDataChange={handleClassRankingData}/>;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {
    //If we are on the last step, then we want to submit the form
    if (activeStep == steps.length-1) {
      //Format application data and upload it to Firestore
      //Still need to check that user actually filled out required fields
      const docData = {
        email: basicInfoFormData.email,
        firstName: basicInfoFormData.firstName,
        lastName: basicInfoFormData.lastName,
        gpa: basicInfoFormData.gpa,
        year: "", //Still need to get this working with the dropdown in BasicInfoForm
        transcriptURL: "", //Still need to get this working as well
        whyInterested: basicInfoFormData.whyInterested,
        rankings: classRankingFormData,
      }
      //Test is currently the document name, will need a naming scheme for docs
      await setDoc(doc(db, "studentApplications", "test"), docData);
    }
    //Otherwise, we just want to move to the next step
    else {
      setActiveStep(activeStep + 1);
    }
    console.log(basicInfoFormData);
    console.log(classRankingFormData);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Fill Application
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your application.
              </Typography>
              <Typography variant="subtitle1">
                Your application has been sent.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}