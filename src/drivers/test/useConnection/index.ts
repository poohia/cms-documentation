import { User } from "../../../types";

const userTest: User = {
  uid: "1234",
  displayName: "test",
  email: "poohia.studio@gmail.com",
};

const useConnection = () => {
  const onceCheckLogged = (): Promise<User> =>
    new Promise((resolve, _reject) => {
      resolve(userTest);
    });

  const signIn = (_email: string, _password: string): Promise<User> =>
    new Promise((resolve, _reject) => {
      resolve(userTest);
    });

  const signOut = (): Promise<void> => Promise.resolve();

  return {
    onceCheckLogged,
    signIn,
    signOut,
  };
};

export default useConnection;
