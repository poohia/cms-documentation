import { useState, useCallback, useEffect } from "react";
import { DriverConnection, User } from "../types";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Connection service error";

const useConnection = () => {
  const [data, setData] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const { onceCheckLogged } = (
      await import(`../drivers/${driver}/useConnection`)
    ).default() as DriverConnection;
    await onceCheckLogged()
      .then((value) => {
        setData(value);
        setLoading(false);
      })
      .catch(() => {
        setError(joazcoError);
        setLoading(false);
      });
  }, []);

  const signIn = useCallback(
    (email: string, password: string): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useConnection`).then((module) => {
          const { signIn: signInDriver } = module.default() as DriverConnection;
          signInDriver(email, password)
            .then((value: User) => {
              setData(value);
              setLoading(false);
              resolve();
            })
            .catch(() => {
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    []
  );

  const signOut = useCallback(
    (): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useConnection`).then((module) => {
          const {
            signOut: signOutDriver,
          } = module.default() as DriverConnection;
          signOutDriver()
            .then(() => {
              setData(undefined);
              setLoading(false);
              resolve();
            })
            .catch(() => {
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    loadData,
    signIn,
    signOut,
  };
};

export default useConnection;
