import * as React from 'react';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';

export default function BasicInfoForm({ onFormDataChange }) {

  const [formData, setFormData] = useState({});
  const [selectedYear, setSelectedYear] = useState("Select Year");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    onFormDataChange(formData);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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
            autoComplete="first-name"
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
            autoComplete="last-name"
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
            autoComplete="email"
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
            autoComplete="gpa"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            label="Year"
            defaultValue="Select Year"
            style={{ width: '100%' }}
          >
            <MenuItem value="Select Year">Select Year</MenuItem>
            <MenuItem value="Freshman">Freshman</MenuItem>
            <MenuItem value="Sophomore">Sophomore</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
          sx={{ my: 3.5 }}
          style={{ width: '100%', height: '50%' }}
          variant="contained"
          component="label"
          size="medium"
          endIcon={<UploadIcon />}
        >
          Upload Transcript
          <input hidden accept=".pdf" multiple type="file" />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
            placeholder="Why are you interested in taking 429?"
            variant="standard"
            onChange = {handleInputChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}