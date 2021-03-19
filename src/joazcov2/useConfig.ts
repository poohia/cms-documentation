import { useMemo } from "react";
// import * as firebase from "firebase/app";

// const defaultFirebase = firebase.default;

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_JOAZCO_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_JOAZCO_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_JOAZCO_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_JOAZCO_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_JOAZCO_FIREBASE_STORAGE_BUCKET,
//   appId: process.env.REACT_APP_JOAZCO_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_JOAZCO_FIREBASE_MEASUREMENT_ID,
// };

// if (
//   !process.env.REACT_APP_JOAZCO_CMS_DRIVER ||
//   process.env.REACT_APP_JOAZCO_CMS_DRIVER === "firebase"
// ) {
//   defaultFirebase.initializeApp(firebaseConfig);
// }

export type UseConfigRest = {
  driver: "firebase" | "localstorage" | "test" | string;
  env: "production" | "development" | "test";
  enableFixtures: boolean;
  icon?: string;
};

const useConfig = (): UseConfigRest => {
  const driver: "firebase" | string = useMemo(
    () => process.env.REACT_APP_JOAZCO_CMS_DRIVER || "firebase",
    []
  );
  const icon: string = useMemo(
    () =>
      process.env.REACT_APP_JOAZCO_ICON ||
      "https://firebasestorage.googleapis.com/v0/b/cms-documentation-83c06.appspot.com/o/logo.png?alt=media&token=e483a55a-6586-4f77-83e4-4f749cc9f91f",
    []
  );
  const env: "production" | "development" | "test" = useMemo(
    () => process.env.NODE_ENV || "development",
    []
  );
  const enableFixtures = useMemo(() => {
    const envEnableFixtures = process.env.REACT_APP_ENABLE_FIXTURES;
    if (!envEnableFixtures || envEnableFixtures === "false") {
      return false;
    }
    if (envEnableFixtures === "true") {
      return true;
    }
    return false;
  }, []);

  return { driver, icon, env, enableFixtures };
};

export default useConfig;
