import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0AzLHh3DTJE-a8X_g3hRw5yiIlt4a-xI",
    authDomain: "manager-project-test.firebaseapp.com",
    projectId: "manager-project-test",
    storageBucket: "manager-project-test.appspot.com",
    messagingSenderId: "819743335708",
    appId: "1:819743335708:web:8ae32ea4c0b14089b006d9",
    measurementId: "G-BEDYS7M6VS",
};

const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app)
const projectFirestore = getFirestore(app)
const database = getDatabase(app);
const storage = getStorage(app);

export { projectAuth, projectFirestore, database, storage }