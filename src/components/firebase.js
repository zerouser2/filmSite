// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCn7lTNOB5I0zny_5zk-1QMuDDNeHqRydQ",
    authDomain: "moviesite-d4a6d.firebaseapp.com",
    databaseURL: "https://moviesite-d4a6d-default-rtdb.firebaseio.com",
    projectId: "moviesite-d4a6d",
    storageBucket: "moviesite-d4a6d.appspot.com",
    messagingSenderId: "984113288537",
    appId: "1:984113288537:web:d833107b1322463091a848",
    databaseURL: "https://moviesite-d4a6d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

