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
      <Paper sx={{ width: 500, height: 550, overflow: 'auto' }} style={{ marginTop: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{ marginLeft: '15px', marginTop: '10px' }}>
            First Name: {basicInfoFormData.firstName}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            Last Name: {basicInfoFormData.lastName}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            Email: {basicInfoFormData.email}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            GPA: {basicInfoFormData.gpa}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            Year: {basicInfoFormData.year}
          </Grid>
        </Grid>
        <Grid container spacing={10} style={{ 'word-wrap': 'break-word', width: '110%' }}>
          <Grid item xs={12} style={{ marginLeft: '15px', marginTop: '15px' }}>
            Why you are interested: {basicInfoFormData.whyInterested}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            Ranking: {rankingFormData.map(section => section).join(', ')}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment >
  );
}