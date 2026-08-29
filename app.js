import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
// Inicializa o Cloud Firestore
const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "educationforll.firebaseapp.com",
  projectId: "educationforll",
  storageBucket: "educationforll.firebasestorage.app",
  messagingSenderId: "291633518629",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seu código para carregar e adicionar aulas entra aqui!
