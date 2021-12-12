import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import { firebaseConfig } from "./config";

// ReactでFirebaseを使う準備
firebase.initializeApp(firebaseConfig);

// Firebaseの機能をexport
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
export const firebaseFunctions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
