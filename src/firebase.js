import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwDMwkkj-b0eS62i8QwidoHEdTtcjBAwY",
  authDomain: "music-app-6e317.firebaseapp.com",
  projectId: "music-app-6e317",
  storageBucket: "music-app-6e317.appspot.com",
  messagingSenderId: "903764999047",
  appId: "1:903764999047:web:1a4425ea7db73586367122",
  measurementId: "G-01JH3ER338",
};
export const app = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = getStorage(app);
export const auth = firebase.auth();
export const provider = new GoogleAuthProvider();
export const signOut = (navigate) => {
  auth.signOut();
  navigate("/");
};

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then(async ({ user, additionalUserInfo }) => {
      if (additionalUserInfo.isNewUser) {
        await setDoc(doc(firestore, "user", user.uid), {
          userName: user.displayName,
          email: user.email,
          musics: [],
          // ...
        });
      }
    })
    .catch((error) => {
      throw error;
    });
};

