// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-ce533.firebaseapp.com",
  projectId: "loginonecart-ce533",
  storageBucket: "loginonecart-ce533.firebasestorage.app",
  messagingSenderId: "935726736103",
  appId: "1:935726736103:web:816ff1c2aebd30e1fbf842",
  measurementId: "G-6E117B5PXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth, provider}