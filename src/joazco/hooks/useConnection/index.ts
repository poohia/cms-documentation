import { useState, useCallback } from "react";
import { Driver, User } from "../../../types";

const jazziError = "Joazco::: Connection service error";

export type UseConnectionRest = {
  logged: boolean | null;
  user: User | null;
  loadingSignIn: boolean;
  getCurrentUser: () => Promise<User>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useConnection = (driver: Partial<Driver>): UseConnectionRest => {
  const [logged, setLogged] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);

  const getCurrentUser = useCallback(
    (): Promise<User> =>
      new Promise((resolve, reject) => {
        const { onceCheckLogged } = driver;
        if (!onceCheckLogged) {
          reject(new Error(jazziError));
          return;
        }
        onceCheckLogged()
          .then((userData) => {
            setLogged(true);
            setUser(userData);
            resolve(userData);
          })
          .catch(() => {
            setLogged(false);
          });
      }),
    []
  );

  const signIn = (email: string, password: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const { signIn: signInDriver } = driver;

      setLoadingSignIn(true);
      if (!signInDriver) {
        reject(new Error(jazziError));
        return;
      }
      signInDriver(email, password)
        .then((userData) => {
          setLogged(true);
          setUser(userData);
          resolve();
        })
        .catch(() => {
          setLogged(false);
          reject(new Error(jazziError));
        })
        .finally(() => setLoadingSignIn(false));
    });

  const signOut = useCallback(
    (): Promise<void> =>
      new Promise((resolve, reject) => {
        const { signOut: signOutDriver } = driver;
        if (!signOutDriver) {
          reject(new Error(jazziError));
          return;
        }
        signOutDriver()
          .then(() => {
            setLogged(false);
            setUser(null);
            resolve();
          })
          .catch(reject);
      }),
    []
  );

  return {
    logged,
    user,
    loadingSignIn,
    getCurrentUser,
    signIn,
    signOut,
  };
};

export default useConnection;
