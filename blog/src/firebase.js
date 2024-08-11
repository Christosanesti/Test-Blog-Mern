// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orthodox-fcac3.firebaseapp.com",
  projectId: "orthodox-fcac3",
  storageBucket: "orthodox-fcac3.appspot.com",
  messagingSenderId: "343538175611",
  appId: "1:343538175611:web:f2b8bb8866adcad0809cde"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);