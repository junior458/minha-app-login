import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyA0nDnvFCYI3OiBJXakcM9MSjiEyA2oUSw",
  authDomain: "minha-app-login.firebaseapp.com",
  projectId: "minha-app-login",
  storageBucket: "minha-app-login.firebasestorage.app",
  messagingSenderId: "926396381559",
  appId: "1:926396381559:web:0f2744a10c118336e04972",
  measurementId: "G-6ZYDDV6JML"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços para serem usados nas outras páginas
export const auth = getAuth(app);
export const db = getFirestore(app);