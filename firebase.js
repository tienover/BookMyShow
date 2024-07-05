import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage' 
import 'firebase/compat/database'


const firebaseConfig = {
  apiKey: "AIzaSyDrQu1VGIubqYD1ifzkiMvQ26Q1dm43w9k",
  authDomain: "do-an-5d757.firebaseapp.com",
  databaseURL: "https://do-an-5d757-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "do-an-5d757",
  storageBucket: "do-an-5d757.appspot.com",
  messagingSenderId: "51827705178",
  appId: "1:51827705178:web:07135a51c621fd631d9f63"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

export { auth, firestore, storage,database }