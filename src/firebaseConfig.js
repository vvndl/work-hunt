import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIjHhbNRNOFeKR069L9LUzTdHqyY_k2zk",
  authDomain: "work-hunt-b6b45.firebaseapp.com",
  projectId: "work-hunt-b6b45",
  storageBucket: "work-hunt-b6b45.appspot.com",
  messagingSenderId: "601093689827",
  appId: "1:601093689827:web:1afaf713b2803646fb90d6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };
