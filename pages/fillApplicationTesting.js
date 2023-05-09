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
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import BasicInfoForm from '../components/BasicInfoForm';
import ClassRankingForm from '../components/ClassRankingForm';
import Review from '../components/Review';

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

const steps = ['Basic Info', 'Class Ranking', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfoForm />;
    case 1:
      return <ClassRankingForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function fillApplication() {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfoFormData, setBasicInfoFormData] = useState({});
  const [classRankingFormData, setClassRankingFormData] = useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
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