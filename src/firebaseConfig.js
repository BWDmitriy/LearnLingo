   // src/firebaseConfig.js
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getDatabase } from 'firebase/database';

//    const firebaseConfig = {
//      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
//      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//      appId: import.meta.env.VITE_FIREBASE_APP_ID,
//    };
const firebaseConfig = {
     apiKey: "AIzaSyD74EdBuUB4RvuFtN7N-Pvb41JNYSvgXnU",
     authDomain: "learnlingo-ddc23.firebaseapp.com",
     databaseURL: "https://learnlingo-ddc23-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "learnlingo-ddc23",
     storageBucket: "learnlingo-ddc23.firebasestorage.app",
     messagingSenderId: "896436305096",
     appId: "1:896436305096:web:5bd297e4f919303622f9fd",
   };
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getDatabase(app);

export { auth, db };
    
