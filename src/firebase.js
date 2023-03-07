import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyCXNxwO0tTSgZB18291RRiR-c6CJIaB98k",
    authDomain: "dotseemple-50203.firebaseapp.com",
    databaseURL: "https://dotseemple-50203-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotseemple-50203",
    storageBucket: "dotseemple-50203.appspot.com",
    messagingSenderId: "915461456977",
    appId: "1:915461456977:web:b91140403ed642f5326470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)