import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDWpTeUmbcYn3FdXF_AfqC6VHMpO5vhxQI",
  authDomain: "masajes-alen.firebaseapp.com",
  projectId: "masajes-alen",
  storageBucket: "masajes-alen.appspot.com",
  messagingSenderId: "407405097372",
  appId: "1:407405097372:web:3d23b8814c798f41301859",
  measurementId: "G-6W0SSCHM54",
});
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "es";

const googleAuthProvider = new GoogleAuthProvider();
const fbAuthProvider = new FacebookAuthProvider();

export { auth, analytics, googleAuthProvider, fbAuthProvider };
