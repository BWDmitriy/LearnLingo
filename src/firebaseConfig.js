import firebase from 'firebase/app';
import 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyD74EdBuUB4RvuFtN7N-Pvb41JNYSvgXnU",
  authDomain: "learnlingo-ddc23.firebaseapp.com",
  databaseURL: "https://learnlingo-ddc23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learnlingo-ddc23",
  storageBucket: "learnlingo-ddc23.firebasestorage.app",
  messagingSenderId: "896436305096",
  appId: "1:896436305096:web:5bd297e4f919303622f9fd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(); 

export { database }; 

