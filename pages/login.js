import { projectAuth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, Paper, AppBar, Toolbar, IconButton } from '@mui/material';
import styles from './login.module.css';
import Image from 'next/image';;
import { Alert } from '@mui/material';
import { red } from '@mui/material/colors';

function CustomDialog({ open, onClose, onConfirm, dialogError}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(dialogError);
  const passwordRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [open]);

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
  

  useEffect(() => {
    if (dialogError) {
      setError(dialogError);
    } else {
      setError(false);
    }
  }, [dialogError]);
    
  const handleConfirm = () => {
    onConfirm(password);
    setPassword('');
  };
    
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} ref = {dialogRef}>
        <DialogTitle>Please enter the password</DialogTitle>
        <DialogContent>
          <Box 
            component = "form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete = "off"
            onSubmit = {(event) => {
            event.preventDefault();
            handleConfirm();
          }}>
          <TextField
            id = "outlined-basic"
            variant = "outlined"
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            ref = {passwordRef}
            fullWidth
          />
          {error && (
            <Typography color = "error" variant = "body2">
              Incorrect password. Please try again.
            </Typography>
          )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            OK
          </Button>
        </DialogActions>
        </Dialog>
      </ThemeProvider>
  );
}

function login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogError, setdialogError] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleGoogleLoginAsStudent = () => {
  
    const provider = new GoogleAuthProvider();
    signInWithPopup(projectAuth, provider)
    .then((result) => {
      if (result.user.email.endsWith('umass.edu')) {
        router.push('/fillApplication');
        setAlert(false);
      }
      else {
        setAlert(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleGoogleLoginAsInstructor = () => {
  
    const provider = new GoogleAuthProvider();
    signInWithPopup(projectAuth, provider)
    .then((result) => {
      if (result.user.email.endsWith('umass.edu')) {
        setOpen(true);
      }
      else {
        setAlert(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setdialogError(false);
  }

  const handleAlertClose = () => {
    setAlert(false);
  }

  const handleConfirm = (password) => {
    if (password == 'test') {
      router.push('/viewApplications');
      setOpen(false);
      setdialogError(false);
    } else {
      setdialogError(true);
    }
  };

  return (
    <div>
      <div className = {styles.topBarContainer}>
       <AppBar position="fixed" sx = {{backgroundColor: "#990000"}}>
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
      </div>
      <div className = { styles.imageContainer }>
        <Image src = "/nature.jpg" alt = "background" fill = 'responsive' style = {{height: '100%', width: '100%'}}/>
      </div>
      <div className = { styles.gridContainer }>
      <Grid container justify="center" alignItems="center" justifyContent = "center">
        <Paper elevation={5} style={{ padding: '2rem' }}>
          <Grid item>
            <Typography variant="h6" component="h2" gutterBottom>
              Get started by logging in!
            </Typography>
          </Grid>
          <form>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent = "center">
              <Grid item>
                <Button variant = "contained" color = "primary" style = {{margin: '0.5rem'}} onClick = {handleGoogleLoginAsStudent}>
                  Log in as Student
                </Button>
                {alert && (
              <Alert severity="warning" onClose={handleAlertClose}>
                You need to log in with a umass.edu email.
              </Alert>)}
              </Grid>
              <Grid item>
                <Button variant = "contained" color = "primary" style = {{margin: '0.5rem'}} onClick = {handleGoogleLoginAsInstructor}>
                  Log in as Instructor
                </Button>
              </Grid>
              <CustomDialog
                open = {open}
                onClose = {handleClose}
                onConfirm = {handleConfirm}
                dialogError= {dialogError}
              />
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  )
}

export default login;