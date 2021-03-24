import { DriverMenus, MenuWithoutPage } from "../../../types";

const databaseError = "Test::: Error database connection";
let menus: MenuWithoutPage[] = [];

const useMenus = (): DriverMenus => {
  const getMenus = (): Promise<MenuWithoutPage[]> =>
    new Promise((resolve, _reject) => {
      resolve(menus);
    });

  const listenMenus = (
    _callback: (data: MenuWithoutPage[] | null) => void
  ): void => {};

  const createMenu = (
    menuTitle: MenuWithoutPage["title"],
    menuCaption: MenuWithoutPage["caption"] = "",
    id?: string
  ): Promise<MenuWithoutPage> =>
    new Promise((resolve, _reject) => {
      const menu = {
        id: id || "1234",
        title: menuTitle,
        caption: menuCaption,
        pages: [],
      };
      menus.push(menu);
      resolve(menu);
    });

  const updateMenu = (menu: MenuWithoutPage): Promise<MenuWithoutPage> =>
    new Promise((resolve, reject) => {
      const findMenu = menus.find((m) => menu.id === m.id);
      if (findMenu) {
        findMenu.title = menu.title;
        findMenu.caption = menu.caption;
        findMenu.pages = menu.pages;
        resolve(findMenu);
      } else {
        reject(new Error(databaseError));
      }
    });

  const removeMenu = (id: MenuWithoutPage["id"]): Promise<void> =>
    new Promise((resolve, reject) => {
      const findMenu = menus.find((m) => id === m.id);
      if (findMenu) {
        menus = menus.filter((m) => m.id !== id);
        resolve();
      } else {
        reject(new Error(databaseError));
      }
    });

  return { getMenus, listenMenus, createMenu, updateMenu, removeMenu };
};

export default useMenus;
