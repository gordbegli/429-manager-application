import database from "../firebase";
import { ref, onValue } from "firebase/database";

export const fetchApplicants = async () => {
  return new Promise((resolve, reject) => {
    const applicantsRef = ref(database, "/studentApplications");
    onValue(
      applicantsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        // Create applicants array
        const applicants = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        resolve(applicants);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
