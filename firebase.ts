import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBETIDQYJDD1fD6kUKiBn4yet1lfj1z8_I',
  authDomain: 'moodl-204a1.firebaseapp.com',
  projectId: 'moodl-204a1',
  storageBucket: 'moodl-204a1.firebasestorage.app',
  messagingSenderId: '742457837661',
  appId: '1:742457837661:web:02a3c037f2d78a5fc765b4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
