import React, {useState} from 'react'
import styles from '../styles/fillApplication.module.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

//Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0AzLHh3DTJE-a8X_g3hRw5yiIlt4a-xI",
  authDomain: "manager-project-test.firebaseapp.com",
  projectId: "manager-project-test",
  storageBucket: "manager-project-test.appspot.com",
  messagingSenderId: "819743335708",
  appId: "1:819743335708:web:8ae32ea4c0b14089b006d9",
  measurementId: "G-BEDYS7M6VS"
};
const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp);

function fillApplication() {

  const [name, setName] = useState("");
  const [references, setReferences] = useState("");
  const [backgroundInfo, setBackgroundInfo] = useState("");
  const [gpa, setGPA] = useState("");
  const [transcript, setTranscript] = useState("");
  const [ranking, setRanking] = useState("");

  async function handleApplicationSubmit(e) {
    e.preventDefault();
    //Format application data and upload it to firestore
    //Still need to do checks such as checking that all fields are filled out, also still need to handle transcript and ranking
    const docData = {
      name: name,
      references: references,
      backgroundInfo: backgroundInfo,
      gpa: gpa,
    }
    await setDoc(doc(db, "studentApplications", name), docData);
  }

  return (
    <div className={styles.fillApplication}> 
      <form className={styles.applicationForm} onSubmit={handleApplicationSubmit}>
        <h1>429 Application Form</h1>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="references">References:</label>
        <input type="text" id="references" name="references" value={references} onChange={(e) => setReferences(e.target.value)}/>
        <label htmlFor="backgroundInfo">Background Information:</label>
        <textarea type="textArea" id="backgroundInfo" name="backgroundInfo" rows="6" cols="50" value={backgroundInfo} onChange={(e) => setBackgroundInfo(e.target.value)}/>
        <label htmlFor="gpa">GPA:</label>
        <input type="text" id="gpa" name="gpa" value={gpa} onChange={(e) => setGPA(e.target.value)}/>
        <label htmlFor="gpa">Transcript:</label>
        <input type="file" accept="transcript/pdf" />
        <label htmlFor="gpa">Ranking (Not yet implemented):</label>
        <button className={styles.submitFormButton} type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default fillApplication