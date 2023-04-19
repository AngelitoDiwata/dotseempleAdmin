import { initializeApp } from "firebase/app";
import { equalTo, set, get, getDatabase, onValue, orderByChild, query, ref, update } from "firebase/database"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { setRef } from "@mui/material";

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
const firebaseConfig_dev = {
    apiKey: "AIzaSyB2ME9ixot8Gpi_5CV4LpGN1b6rLEid-dM",
    authDomain: "dotseemple-dev.firebaseapp.com",
    databaseURL: "https://dotseemple-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotseemple-dev",
    storageBucket: "dotseemple-dev.appspot.com",
    messagingSenderId: "276412099994",
    appId: "1:276412099994:web:e288744d41f03c89fede23",
    measurementId: "G-0Q5PXN96WY"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig_dev);
export const db = getDatabase(app)
export const auth = getAuth(app)


export function getUserByHandle(handle) {
    return get(query(ref(db, '/data'), orderByChild('handle'), equalTo(handle.toUpperCase())))
}


export const resetAllPoints = () => {
    onValue(ref(db), (snapshot) => {
        const res = snapshot.val();
        try {
            Object.values(res.data).map((entry) => {
                update(ref(db, `/data/${entry.uuid}`), { collections: [], connections: 0, email: '', wallet: '' })
            })
        } catch (_) {

        }
    });
}

export async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
}

export async function userSignout() {
    return await signOut(auth)
}

export async function incentivize(data) {
    return await (update(ref(db, `data/${data.uuid}/`), { connections: data.collections.length, collections: data.collections }))
}

export async function updateStatus(data) {
    return await (update(ref(db, `data/${data.uuid}/linkEntry`), { status: data.status }))
}

export async function getDrops() {
    return await get(ref(db, '/drops'))
}

export async function setDROP(data) {
    return await (update(ref(db, `/drops/${data.uuid}`), { title: data.title, ttl: data.ttl }))
}

export async function updateLinkSub(data) {
    return await (update(ref(db, `/linkSub`), { confMsg: data.confMsg, deductPts: data.deductPts, okMsg: data.okMsg, title: data.title }))
}

export async function getCampaigns() {
    return await get(ref(db, '/campaigns'))
}

export async function addCampagin(data) {
    return await (set(ref(db, `/campaigns/${data.uuid}`), { id: data.uuid, name: data.name, title: data.title, end_date: data.ttl, confirm_message: data.confMsg, success_message: data.okMsg }))
}

export async function updateCampagin(data) {
    return await (update(ref(db, `/campaigns/${data.uuid}`), { id: data.uuid, name: data.name, title: data.title, end_date: data.ttl, confirm_message: data.confMsg, success_message: data.okMsg }))
}