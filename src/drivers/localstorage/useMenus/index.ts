import { getLocale } from "../..";
import { DriverMenus, MenuWithoutPage } from "../../../types";

const databaseError = "LocalStorage::: Error database connection";

const useMenus = (): DriverMenus => {
  const locale = getLocale();
  const localStorageKey = `${locale}.menus`;

  const getMenus = (): Promise<MenuWithoutPage[]> =>
    new Promise((resolve, _reject) => {
      const menusDatabase = localStorage.getItem(localStorageKey);
      const menus = menusDatabase ? JSON.parse(menusDatabase) : [];
      resolve(menus);
    });

  const listenMenus = (
    _callback: (data: MenuWithoutPage[] | null) => void
  ): void => {
    throw new Error("LiveChange function dosn't work with driver localstorage");
  };

  const createMenu = (
    menuTitle: MenuWithoutPage["title"],
    menuCaption: MenuWithoutPage["caption"] = "",
    id?: string
  ): Promise<MenuWithoutPage> =>
    new Promise((resolve, _reject) => {
      getMenus().then((menus) => {
        const finalId: string =
          menus.length > 0
            ? Number(Number(menus[menus.length - 1].id) + 1).toString()
            : "0";
        const menu: MenuWithoutPage = {
          id: id || finalId,
          title: menuTitle,
          caption: menuCaption,
          pages: [],
        };
        menus.push(menu);
        localStorage.setItem(localStorageKey, JSON.stringify(menus));
        resolve(menu);
      });
    });

  const updateMenu = (menu: MenuWithoutPage): Promise<MenuWithoutPage> =>
    new Promise((resolve, reject) => {
      getMenus().then((menus) => {
        const findMenu = menus.find((m) => menu.id === m.id);
        if (findMenu) {
          findMenu.title = menu.title;
          findMenu.caption = menu.caption;
          findMenu.pages = menu.pages;
          localStorage.setItem(localStorageKey, JSON.stringify(menus));
          setTimeout(() => resolve(findMenu), 200);
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  const removeMenu = (id: MenuWithoutPage["id"]): Promise<void> =>
    new Promise((resolve, reject) => {
      getMenus().then((menus) => {
        const findMenu = menus.find((m) => id === m.id);
        if (findMenu) {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(menus.filter((m) => m.id !== id))
          );
          resolve();
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  return { getMenus, listenMenus, createMenu, updateMenu, removeMenu };
};

export default useMenus;
