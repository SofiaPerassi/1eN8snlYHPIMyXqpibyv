import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN5scV987V_f5Q9qyETNXjxWeuiKwAEaM",
  authDomain: "chat-app-85233.firebaseapp.com",
  projectId: "chat-app-85233",
  storageBucket: "chat-app-85233.appspot.com",
  messagingSenderId: "813726630688",
  appId: "1:813726630688:web:776f6b97320926c69e8d45"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)
export const db = getFirestore();