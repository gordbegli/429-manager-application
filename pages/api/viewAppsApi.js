import database from "../../lib/Firebase";
import { ref, onValue, child } from "firebase/database";

export const fetchApplicants = async () => {
  return new Promise((resolve, reject) => {
    const applicantsRef = ref(database, "studentApplications");
    onValue(
      applicantsRef,
      (snapshot) => {
        const data = snapshot.val();
        const applicants = Object.keys(data).map((key) => ({

        }));
        resolve(applicants);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
