// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQgisoc9DWZ1zlDh6Um__qzizwa2Ulnu8",
  authDomain: "assignment-plateshare.firebaseapp.com",
  projectId: "assignment-plateshare",
  storageBucket: "assignment-plateshare.firebasestorage.app",
  messagingSenderId: "477230251003",
  appId: "1:477230251003:web:34b8e233ec2ee8353ce95e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
