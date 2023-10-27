
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuD3albpmHliy7ICi1I8IZLLg6tYDc2U4",
  authDomain: "sharesett-219c7.firebaseapp.com",
  projectId: "sharesett-219c7",
  storageBucket: "sharesett-219c7.appspot.com",
  messagingSenderId: "245468681135",
  appId: "1:245468681135:web:41aa017dde1986489ad55a",
  measurementId: "G-T1DQQ61Q0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;