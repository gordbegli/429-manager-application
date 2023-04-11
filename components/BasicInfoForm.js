import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm() {

  const [formData, setFormData] = React.useState({});

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    onFormUpdate({ ...basicInfoFormData, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="UMass Email"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gpa"
            name="gpa"
            label="GPA"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gpa"
            name="gpa"
            label="GPA"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}