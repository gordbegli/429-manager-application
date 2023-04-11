import React from "react";
import { useParams } from "react-router-dom";

const ApplicantDetails = ({ applicants }) => {
  const { id } = useParams();
  const applicant = applicants.find((applicant) => applicant.id === parseInt(id));

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

  return (
    <div>
      <h1>{applicant.name}</h1>
      <h2>Applicant Details</h2>
      <p>ID: {applicant.id}</p>
      <p>Name: {applicant.name}</p>
      <p>Email: {applicant.email}</p>
      <p>Major: {applicant.major}</p>
      <p>GPA: {applicant.gpa}</p>
      <h2>Why I think I'm right for the job</h2>
      <p>{applicant.whyRightForJob}</p>
      <h2>Why the job is right for me</h2>
      <p>{applicant.whyJobRightForMe}</p>
    </div>
  );
};

export default ApplicantDetails;


