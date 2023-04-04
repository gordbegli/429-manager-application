import React from 'react'
import styles from '../styles/fillApplication.module.css'

const firebaseConfig = {
  apiKey: "AIzaSyC0AzLHh3DTJE-a8X_g3hRw5yiIlt4a-xI",
  authDomain: "manager-project-test.firebaseapp.com",
  projectId: "manager-project-test",
  storageBucket: "manager-project-test.appspot.com",
  messagingSenderId: "819743335708",
  appId: "1:819743335708:web:8ae32ea4c0b14089b006d9",
  measurementId: "G-BEDYS7M6VS"
};

function fillApplication() {

  return (
    <div className={styles.fillApplication}> 
      <form className={styles.applicationForm} action="/send-data-here" method="post">
        <h1>429 Application Form</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="references">References:</label>
        <input type="text" id="references" name="references" />
        <label htmlFor="backgroundInfo">Background Information:</label>
        <textarea type="textArea" id="backgroundInfo" name="backgroundInfo" rows="6" cols="50"/>
        <label htmlFor="gpa">GPA:</label>
        <input type="text" id="gpa" name="gpa" />
        <label htmlFor="gpa">Transcript:</label>
        <input type="file" accept="transcript/pdf" />
        <label htmlFor="gpa">Ranking (Not yet implemented):</label>
        <button className={styles.submitFormButton} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default fillApplication