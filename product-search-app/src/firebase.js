// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWZmg5ElMmUY8rorq6ebwJt72_xpjTyC8",
  authDomain: "multiple-product-management.firebaseapp.com",
  projectId: "multiple-product-management",
  storageBucket: "multiple-product-management.firebasestorage.app",
  messagingSenderId: "802787094494",
  appId: "1:802787094494:web:a7688061fed38f5710774f",
  measurementId: "G-DHHS04CNY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};