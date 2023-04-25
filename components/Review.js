import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Review({ basicInfoFormData, rankingFormData }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Application Review
      </Typography>
      <Paper sx={{ width: 500, height: 500, overflow: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            First Name: {basicInfoFormData.firstName}
          </Grid>
          <Grid item xs={12} sm={6}>
            Last Name: {basicInfoFormData.lastName}
          </Grid>
          <Grid item xs={12} sm={6}>
            Email: {basicInfoFormData.email}
          </Grid>
          <Grid item xs={12} sm={6}>
            GPA: {basicInfoFormData.gpa}
          </Grid>
          <Grid item xs={12} sm={6}>
            Year: {basicInfoFormData.year}
          </Grid>
          <Grid item xs={12} sm={6}>
            Transcript: {basicInfoFormData.filePath}
          </Grid>
          <Grid item xs={12}>
            Why you are interested: {basicInfoFormData.whyInterested}
          </Grid>
          <Grid item xs={12}>
            Ranking: {
              rankingFormData[0]
            }
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}