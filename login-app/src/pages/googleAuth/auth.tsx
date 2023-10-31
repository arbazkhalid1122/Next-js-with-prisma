import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3VbgZfV0lCQ4--38VOuHQzF2Z7t6kLCo",
  authDomain: "plenary-hybrid-398607.firebaseapp.com",
  projectId: "plenary-hybrid-398607",
  storageBucket: "plenary-hybrid-398607.appspot.com",
  messagingSenderId: "919784759049",
  appId: "1:919784759049:web:6d7a1584a214612399fdd8",
  measurementId: "G-SMXGJN0GZN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const logOut = () => {
  signOut(auth);
};

export const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
      console.error("Error signing up with Google:", error);
      throw error;
    });
};
