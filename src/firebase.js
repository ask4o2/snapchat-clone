import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCapjJ2vCqF5WUYgfWt18U_LnZ8y3GgOxg",
  authDomain: "snapchat-ecc85.firebaseapp.com",
  projectId: "snapchat-ecc85",
  storageBucket: "snapchat-ecc85.appspot.com",
  messagingSenderId: "801279303436",
  appId: "1:801279303436:web:db3a8aca39103c4418b329",
  measurementId: "G-XTQ6130G2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage(app);

export { db, auth, provider, storage };
