// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBiZbymBIfWdMzB1_0z2Xwd-7bL45z4lc",
  authDomain: "account-management-e1e06.firebaseapp.com",
  projectId: "account-management-e1e06",
  storageBucket: "account-management-e1e06.appspot.com",
  messagingSenderId: "376560369159",
  appId: "1:376560369159:web:aff3edd1b7fea3784974a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;