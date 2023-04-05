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
import TextField from "material-ui/TextField";
import { MuiThemeProvider } from "material-ui/styles";
import { Typography } from "@mui/material";

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
    <MuiThemeProvider>
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
      </MuiThemeProvider>
  );
}

function login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogError, setdialogError] = useState(false);
  const handleGoogleLoginAsStudent = () => {
  
    const provider = new GoogleAuthProvider();
    signInWithPopup(projectAuth, provider)
    .then((result) => {
      if (result.user.email.endsWith('umass.edu')) {
        router.push('/fillApplication');
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
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setdialogError(false);
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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button style = {{margin: '0.5rem'}} onClick = {handleGoogleLoginAsStudent}>
        Log in as Student
      </Button>
      <Button style = {{margin: '0.5rem'}} onClick = {handleGoogleLoginAsInstructor}>
        Log in as Instructor
      </Button>
      <CustomDialog
        open = {open}
        onClose = {handleClose}
        onConfirm = {handleConfirm}
        dialogError= {dialogError}
      />
    </div>
  )
}

export default login;