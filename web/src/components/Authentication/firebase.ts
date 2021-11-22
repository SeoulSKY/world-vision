import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwR6cTm5Jl50sHJaCBwpoaqkleeg-S0pk",
  authDomain: "cmpt353-3df7e.firebaseapp.com",
  projectId: "cmpt353-3df7e",
  storageBucket: "cmpt353-3df7e.appspot.com",
  messagingSenderId: "434187345510",
  appId: "1:434187345510:web:515e39f8424f83ac5a17a7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase)
export default firebase;