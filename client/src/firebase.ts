import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7xJQ2_nbvPZplIV5OC2Dg3-YFu6Y2Bbs",
    authDomain: "clone-2dc77.firebaseapp.com",
    projectId: "clone-2dc77",
    storageBucket: "clone-2dc77.appspot.com",
    messagingSenderId: "337539867182",
    appId: "1:337539867182:web:0d4a3df666eb0d7ef375bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;