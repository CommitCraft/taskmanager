// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "drive-clone-1ec4f.firebaseapp.com",
  projectId: "drive-clone-1ec4f",
  storageBucket: "drive-clone-1ec4f.appspot.com",
  messagingSenderId: "103280614646",
  appId: "1:103280614646:web:12e229a1fb140c860de0d7",
  measurementId: "G-5CTSM7E7RP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);