import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
/**
 * PROD CONFIG
 */
const firebaseConfig_prod = {
    apiKey: "AIzaSyCXNxwO0tTSgZB18291RRiR-c6CJIaB98k",
    authDomain: "dotseemple-50203.firebaseapp.com",
    databaseURL: "https://dotseemple-50203-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotseemple-50203",
    storageBucket: "dotseemple-50203.appspot.com",
    messagingSenderId: "915461456977",
    appId: "1:915461456977:web:b91140403ed642f5326470"
};

/**
 * DEV TEST CONFIG
 */
// const firebaseConfig_prod = {
//     apiKey: "AIzaSyB2ME9ixot8Gpi_5CV4LpGN1b6rLEid-dM",
//     authDomain: "dotseemple-dev.firebaseapp.com",
//     databaseURL: "https://dotseemple-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "dotseemple-dev",
//     storageBucket: "dotseemple-dev.appspot.com",
//     messagingSenderId: "276412099994",
//     appId: "1:276412099994:web:e288744d41f03c89fede23",
//     measurementId: "G-0Q5PXN96WY"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig_prod);
export const db = getDatabase(app)