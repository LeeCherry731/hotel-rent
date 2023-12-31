// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { DocumentData, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { userState } from "../stores/users/userSlice";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBT-FYoK7p8EuQsXL8BY5oYz6sZawSrGk4",
    authDomain: "hotel-rent-e74c3.firebaseapp.com",
    projectId: "hotel-rent-e74c3",
    storageBucket: "hotel-rent-e74c3.appspot.com",
    messagingSenderId: "98950195950",
    appId: "1:98950195950:web:3447fd7a591f833fbd21ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const dbHotels = collection(db, "hotels");
export const dbRooms = collection(db, "rooms");
export const dbUsers = collection(db, "users");