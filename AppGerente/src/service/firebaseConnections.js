// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe2Q5HW5nFKCLPHzpjJEX7Q9lQjb-TrNA",
  authDomain: "crudreactnative-fe385.firebaseapp.com",
  projectId: "crudreactnative-fe385",
  storageBucket: "crudreactnative-fe385.firebasestorage.app",
  messagingSenderId: "346056379413",
  appId: "1:346056379413:web:d2810fba9e062358a4121c",
  measurementId: "G-7RBDGYQ1H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// referências úteis
const produtosCollection = collection(db, "produtos");

export {
  db,
  produtosCollection,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
};