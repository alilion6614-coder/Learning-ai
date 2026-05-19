import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqYfAumreF-05oEg7HczorGGzyG3WuD7Q",
  authDomain: "analytical-age-z07pf.firebaseapp.com",
  projectId: "analytical-age-z07pf",
  storageBucket: "analytical-age-z07pf.firebasestorage.app",
  messagingSenderId: "72236024336",
  appId: "1:72236024336:web:426ec754eee5821540c095"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
