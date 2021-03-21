import * as firebase from "firebase/app";
import "firebase/database";
import { getLocale } from "../..";
import { MenuWithoutPage } from "../../../types";

const defaultFirebase = firebase.default;
const database = defaultFirebase.database();

const databaseError = "Firebase::: Error database connection";

const useMenus = () => {
  const locale = getLocale();
  const getMenus = (): Promise<MenuWithoutPage[]> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/menus`);
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

  const listenMenus = (
    callback: (data: MenuWithoutPage[] | null) => void
  ): void => {
    const table = database.ref(`${locale}/menus`);
    table.on("value", (snapshot) => {
      const val = snapshot.val();
      if (val) {
        callback(Object.keys(val).map((key) => ({ ...val[key] })));
      } else {
        callback(null);
      }
    });
  };

  const createMenu = (
    menuTitle: MenuWithoutPage["title"],
    menuCaption: MenuWithoutPage["caption"] = "",
    id?: string
  ): Promise<MenuWithoutPage> =>
    new Promise((resolve, reject) => {
      let table = database.ref(`${locale}/menus`);
      const { key } = table.push();
      if (key) {
        const finalKey = id || key;
        const newMenu: MenuWithoutPage = {
          id: finalKey,
          title: menuTitle,
          caption: menuCaption,
          pages: [],
        };
        table = database.ref(`${locale}/menus/${finalKey}`);
        table
          .set(newMenu)
          .then(() => resolve(newMenu))
          .catch(() => reject(new Error(databaseError)));
      }
    });

  const updateMenu = (menu: MenuWithoutPage): Promise<MenuWithoutPage> =>
    new Promise((resolve, reject) => {
      const table = database.ref(`${locale}/menus/${menu.id}`);
      table
        .set(menu)
        .then(() => resolve(menu))
        .catch(() => reject(new Error(databaseError)));
    });

  const removeMenu = (id: MenuWithoutPage["id"]): Promise<void> => {
    const table = database.ref(`${locale}/menus/${id}`);
    return table.remove();
  };

  return { getMenus, listenMenus, createMenu, updateMenu, removeMenu };
};

export default useMenus;
