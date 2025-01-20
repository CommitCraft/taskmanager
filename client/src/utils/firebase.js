// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-crm.firebaseapp.com",
  projectId: "task-manager-crm",
  storageBucket: "task-manager-crm.firebasestorage.app",
  messagingSenderId: "702619885069",
  appId: "1:702619885069:web:ed1f667fffcec0c1727f44",
  measurementId: "G-PEGZ7VT3RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);