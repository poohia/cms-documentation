import { User } from "../../../types";

const userLocal: User = {
  uid: "1234",
  displayName: "test",
  email: "poohia.studio@gmail.com",
};

const useConnection = () => {
  const onceCheckLogged = (): Promise<User> =>
    new Promise((resolve, _reject) => {
      resolve(userLocal);
    });

  const signIn = (_email: string, _password: string): Promise<User> =>
    new Promise((resolve, _reject) => {
      resolve(userLocal);
    });

  const signOut = (): Promise<void> => Promise.resolve();

  return {
    onceCheckLogged,
    signIn,
    signOut,
  };
};

export default useConnection;
