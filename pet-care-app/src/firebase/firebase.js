import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaWaS2ACbQLFkmLfCfvv64lGW9kIp85yQ",
  authDomain: "pet-care-app-a6616.firebaseapp.com",
  projectId: "pet-care-app-a6616",
  storageBucket: "pet-care-app-a6616.firebasestorage.app",
  messagingSenderId: "1085381841005",
  appId: "1:1085381841005:web:bac61bb022d4e5a719af64",
  measurementId: "G-MR7944CWNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);