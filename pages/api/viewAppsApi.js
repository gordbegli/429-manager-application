import database from "../lib/firebase.js";
import { ref, onValue, child } from "firebase/database";

export const fetchApplicants = async () => {
  return new Promise((resolve, reject) => {
    const applicantsRef = ref(database, "applicants");
    onValue(
      applicantsRef,
      (snapshot) => {
        const data = snapshot.val();
        const applicants = Object.keys(data).map((key) => ({
          id: key  // add more here
        }));
        resolve(applicants);
      },
      (error) => {
        reject(error);
      }
    );
  });
};


