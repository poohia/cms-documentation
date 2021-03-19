import * as firebase from "firebase/app";
import "firebase/database";
import { getLocale } from "../..";
import { DriverSeo, SEO } from "../../../types";

const defaultFirebase = firebase.default;
const database = defaultFirebase.database();

const databaseError = "Firebase::: Error database connection";

const useSeo = (): DriverSeo => {
  const locale = getLocale();
  const insertSeo = (data: SEO): Promise<SEO> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/seo`);
      table
        .set(data)
        .then(() => {
          resolve(data);
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const getSeo = (): Promise<Partial<SEO>> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/seo`);
      table
        .once("value")
        .then((snapshot) => {
          const val = snapshot.val();
          if (val === null) {
            resolve({});
          } else {
            resolve(val);
          }
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const listenSeo = (callback: (data: Partial<SEO>) => void): void => {
    const table = database.ref(`${locale}/seo`);
    table.on("value", (snapshot) => {
      const val = snapshot.val();
      if (val === null) {
        callback({});
      } else {
        callback(val);
      }
    });
  };

  return { insertSeo, getSeo, listenSeo };
};

export default useSeo;
