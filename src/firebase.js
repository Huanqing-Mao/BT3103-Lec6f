import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDm77D3YUx-ZU_twtn9_F-tB_yU8S1GKiQ",
    authDomain: "lecture4-73aae.firebaseapp.com",
    projectId: "lecture4-73aae",
    storageBucket: "lecture4-73aae.appspot.com",
    messagingSenderId: "384246315710",
    appId: "1:384246315710:web:e2506da932135e67d93cef",
    measurementId: "G-6RD9S4EYLB"
  };

// Initialise Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;