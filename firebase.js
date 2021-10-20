// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVBNPw9u0D5KJC9sCefkHEN1QNajvhFc8",
    authDomain: "instagram-a9c4f.firebaseapp.com",
    projectId: "instagram-a9c4f",
    storageBucket: "instagram-a9c4f.appspot.com",
    messagingSenderId: "66049987836",
    appId: "1:66049987836:web:da8f021e604304ac903379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};