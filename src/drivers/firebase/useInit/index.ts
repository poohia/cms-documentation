import * as firebase from "firebase/app";

const defaultFirebase = firebase.default;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_JOAZCO_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_JOAZCO_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_JOAZCO_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_JOAZCO_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_JOAZCO_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_JOAZCO_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_JOAZCO_FIREBASE_MEASUREMENT_ID,
};

defaultFirebase.initializeApp(firebaseConfig);
