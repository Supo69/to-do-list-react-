import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMhs7rDA4xpHiogBXXjRYJ_LyTIlYzK2Y",
  authDomain: "to-do-items-react.firebaseapp.com",
  databaseURL: "https://to-do-items-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "to-do-items-react",
  storageBucket: "to-do-items-react.appspot.com",
  messagingSenderId: "422051899199",
  appId: "1:422051899199:web:6bc04da9e177f46cf9d58a",
  measurementId: "G-981KKZ5VEM"
};

// Initialize Firebase
const init = initializeApp(firebaseConfig);
const analytics = getAnalytics(init);

export const db = getFirestore(init)
