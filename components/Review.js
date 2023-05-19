import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../pages/firebase.js";

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Review({ basicInfoFormData, rankingFormData }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  function getPdfView(viewPdf) {
    if (viewPdf == undefined) {
      return <p><b>No Transcript Uploaded</b></p>
    }
    if (basicInfoFormData.file.type != 'application/pdf') {
      return <p><b>Please upload a PDF file</b></p>
    }
    return <div style={{ height: '750px' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={basicInfoFormData.viewPdf} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  }

  return (
    <React.Fragment>
      <Typography variant="h6">
        Application Review
      </Typography>
      <Paper sx={{ overflow: 'auto' }} style={{ marginTop: '15px' }}>
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
          <Grid item xs={12} style={{ marginLeft: '15px' }}>
            Ranking: {rankingFormData.map(section => section).join(', ')}
          </Grid>
        </Grid>
        <Grid container spacing={10} style={{ 'word-wrap': 'break-word', width: '110%' }}>
          <Grid item xs={12} style={{ marginLeft: '15px', marginTop: '15px' }}>
            Why you are interested: {basicInfoFormData.whyInterested}
          </Grid>
          <Grid item xs={12} style={{ marginLeft: '15px', marginTop: '15px', marginRight: '15px' }}>
            Transcript:
            {getPdfView(basicInfoFormData.viewPdf)}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment >
  );
}