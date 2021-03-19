import * as firebase from "firebase/app";
import "firebase/database";
import { getLocale } from "../..";

const defaultFirebase = firebase.default;
const database = defaultFirebase.database();
const databaseError = "Firebase::: Error database connection";

const useStylesheet = () => {
  const locale = getLocale();
  const insertStylesheet = (data: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/css`);
      table
        .set(data)
        .then(() => resolve(data))
        .catch(() => reject(new Error(databaseError)));
    });

  const getStylesheet = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/css`);
      table
        .once("value")
        .then((snapshot) => {
          const val = snapshot.val();
          if (val === null) {
            resolve("");
          } else {
            resolve(val);
          }
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const listenStylesheet = (callback: (data: string) => void): void => {
    const table = database.ref(`${locale}/css`);
    table.on("value", (snapshot) => {
      const val = snapshot.val();
      if (val === null) {
        callback("");
      } else {
        callback(val);
      }
    });
  };

  return { insertStylesheet, getStylesheet, listenStylesheet };
};

export default useStylesheet;
