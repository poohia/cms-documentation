import * as firebase from "firebase/app";
import "firebase/database";
import { getLocale } from "../..";
import { Page } from "../../../types";

const defaultFirebase = firebase.default;
const database = defaultFirebase.database();

const databaseError = "Firebase::: Error database connection";

const usePages = () => {
  const locale = getLocale();
  const getPages = (): Promise<Page[]> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/pages`);
      table
        .once("value")
        .then((snapshot) => {
          const val = snapshot.val();
          if (val === null) {
            resolve([]);
          } else {
            resolve(Object.keys(val).map((key) => ({ ...val[key] })));
          }
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const getPage = (id: Page["id"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/pages/${id}`);
      table
        .once("value")
        .then((snapshot) => {
          const val = snapshot.val();
          if (val === null) {
            reject(new Error("Firebase::: Page not found"));
          } else {
            resolve(val);
          }
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const getPageBySlug = (slug: Page["slug"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/pages`);
      table
        .orderByChild("slug")
        .startAt(slug)
        .endAt(slug)
        .once("value")
        .then((snapshot) => {
          const val = snapshot.val();
          if (val === null) {
            reject(new Error("Firebase::: Page not found"));
          } else {
            resolve({ ...val[Object.keys(val)[0]] });
          }
        })
        .catch(() => reject(new Error(databaseError)));
    });

  const listenPageBySlug = (
    slug: Page["slug"],
    callback: (page: Page | null) => void
  ): void => {
    const table = database.ref(`${locale}/pages`);
    table
      .orderByChild("slug")
      .startAt(slug)
      .endAt(slug)
      .on("value", (snapshot) => {
        const val = snapshot.val();
        if (val === null) {
          callback(val);
        } else {
          callback({ ...val[Object.keys(val)[0]] });
        }
      });
  };

  const createPage = (page: Omit<Page, "id">, id?: string): Promise<Page> =>
    new Promise((resolve, reject) => {
      let table = database.ref(`${locale}/pages`);
      const { key } = table.push();
      if (key) {
        const finalKey = id || key;
        const newPage: Page = { ...page, id: finalKey };
        table = database.ref(`${locale}/pages/${finalKey}`);
        table
          .set(newPage)
          .then(() => resolve(newPage))
          .catch(() => reject(new Error(databaseError)));
      }
    });

  const updatePage = (page: Page, id?: string): Promise<Page> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/pages/${id || page.id}`);
      table
        .set(page)
        .then(() => resolve(page))
        .catch(() => reject(new Error(databaseError)));
    });

  const removePage = (id: Page["id"]): Promise<void> => {
    const table = database.ref(`${locale}/pages/${id}`);
    return table.remove();
  };

  return {
    getPages,
    getPage,
    getPageBySlug,
    listenPageBySlug,
    createPage,
    updatePage,
    removePage,
  };
};

export default usePages;
