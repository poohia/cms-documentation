import * as firebase from "firebase/app";
import "firebase/auth";

import { DriverConnection, User } from "../../../types";

const defaultFirebase = firebase.default;
const databaseError = "Firebase::: Error database connection";

const useConnection = (): DriverConnection => {
  const onceCheckLogged = (): Promise<User> =>
    new Promise((resolve, reject) => {
      const unSubscribe = defaultFirebase.auth().onAuthStateChanged((user) => {
        unSubscribe();
        if (user) {
          resolve({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          });
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  const signIn = (email: string, password: string): Promise<User> =>
    new Promise((resolve, reject) => {
      defaultFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user) {
            resolve({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
            });
          } else {
            reject(new Error(databaseError));
          }
        })
        .catch(reject);
    });

  const signOut = (): Promise<void> => defaultFirebase.auth().signOut();

  return {
    onceCheckLogged,
    signIn,
    signOut,
  };
};

export default useConnection;
