import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1bxUjHnFsgbym9IMIsUn_R0m4dQ-E3iQ",
  authDomain: "furia-chat-cb55c.firebaseapp.com",
  projectId: "furia-chat-cb55c",
  storageBucket: "furia-chat-cb55c.firebasestorage.app",
  messagingSenderId: "502894595462",
  appId: "1:502894595462:web:2f60740541f599ccaab007",
  measurementId: "G-YNVW6Q17K0"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);