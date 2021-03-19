import { useState, useCallback } from "react";
import { Driver, Menu, MenuWithoutPage, Page } from "../../../types";

const jazziError = "Joazco::: Menus service error";

export type UseMenusRest = {
  loadingMenus: boolean | null;
  menusIsListening: boolean;
  menus: Menu[];
  getMenus: () => Promise<Menu[]>;
  listenMenus: () => void;
  createMenu: (
    menuTitle: Menu["title"],
    menuCaption: Menu["caption"],
    id?: string
  ) => Promise<Menu>;
  updateMenu: (
    menuId: Menu["id"],
    menuTitle: Menu["title"],
    menuCaption: Menu["caption"]
  ) => Promise<Menu>;
  removeMenu: (id: Menu["id"]) => Promise<Menu[]>;
  addPageFromMenu: (
    menuId: Menu["id"],
    pageId: Page["id"],
    menu?: Menu
  ) => Promise<Menu>;
  removePageFromMenu: (
    menuId: Menu["id"],
    pageId: Page["id"],
    menu?: Menu
  ) => Promise<Menu>;
};

function menuFromMenuWithoutPage(
  menus: MenuWithoutPage[],
  pages: Page[]
): Menu[] {
  const currMenus: Menu[] = [];
  menus.forEach((menu) => {
    const { id, title, caption } = menu;
    const currMenu: Menu = {
      id,
      title,
      caption,
      pages: [],
    };
    if (menu.pages) {
      menu.pages.forEach((pageId) => {
        const findPage = pages.find((page) => page.id === pageId);
        if (findPage) {
          currMenu.pages.push(findPage);
        }
      });
    }
    currMenus.push(currMenu);
  });
  return currMenus;
}

const useMenus = (driver: Partial<Driver>, pages: Page[]): UseMenusRest => {
  const [loadingMenus, setLoadingMenus] = useState<boolean | null>(null);
  const [menusIsListening, setMenusIsListening] = useState<boolean>(false);
  const [menus, setMenus] = useState<Menu[]>([]);

  const getMenus = useCallback(
    (): Promise<Menu[]> =>
      new Promise((resolve, reject) => {
        const { getMenus: getMenusDriver } = driver;
        if (!getMenusDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        getMenusDriver()
          .then((value) => {
            const currMenus = menuFromMenuWithoutPage(value, pages);
            setMenus(currMenus);
            resolve(currMenus);
          })
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [pages]
  );

  const listenMenus = useCallback((): void => {
    const { listenMenus: listenMenusDriver } = driver;
    if (!listenMenusDriver) {
      return;
    }
    if (!menusIsListening) {
      setMenusIsListening(true);
    }
    listenMenusDriver((value) => {
      if (value) {
        const currMenus = menuFromMenuWithoutPage(value, pages);
        setMenus(currMenus);
      }
    });
  }, [pages]);

  const createMenu = useCallback(
    (
      menuTitle: Menu["title"],
      menuCaption: Menu["caption"] = "",
      id?: string
    ): Promise<Menu> =>
      new Promise((resolve, reject) => {
        const findMenu = menus.find((menu) => menu.title === menuTitle);
        if (findMenu) {
          reject(new Error("Joazco::: Menu name already existing "));
          return;
        }
        const { createMenu: createMenuDriver } = driver;
        if (!createMenuDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        createMenuDriver(menuTitle, menuCaption, id)
          .then((value) => {
            const finalMenu: Menu = { ...value, pages: [] };
            setMenus(menus.concat(finalMenu));
            resolve(finalMenu);
          })
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [menus]
  );

  const updateMenu = useCallback(
    (
      menuId: Menu["id"],
      menuTitle: Menu["title"],
      menuCaption: Menu["caption"] = ""
    ): Promise<Menu> =>
      new Promise((resolve, reject) => {
        const findMenu = menus.find((menu) => menu.id === menuId);
        if (!findMenu) {
          reject(new Error("Joazco::: Menu not fond refresh page"));
          return;
        }
        const { updateMenu: updateMenuDriver } = driver;
        if (!updateMenuDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        findMenu.title = menuTitle;
        findMenu.caption = menuCaption;
        updateMenuDriver({
          ...findMenu,
          pages: findMenu.pages.map((page) => page.id),
        })
          .then(() => resolve(findMenu))
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [menus]
  );

  const removeMenu = useCallback(
    (id: Menu["id"]): Promise<Menu[]> =>
      new Promise((resolve, reject) => {
        const { removeMenu: removeMenuDriver } = driver;
        if (!removeMenuDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        removeMenuDriver(id)
          .then(() => {
            const newMenus = menus.filter((menu) => menu.id !== id);
            setMenus(newMenus);
            resolve(newMenus);
          })
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [menus]
  );

  const addPageFromMenu = useCallback(
    (menuId: Menu["id"], pageId: Page["id"], menu?: Menu): Promise<Menu> =>
      new Promise((resolve, reject) => {
        const { updateMenu: updateMenuDriver } = driver;
        if (!updateMenuDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        const findMenu =
          typeof menu !== "undefined"
            ? menu
            : menus.find((m) => m.id === menuId);
        const findPage = pages.find((page) => page.id === pageId);
        if (!findMenu || !findPage) {
          reject(new Error("Joazco::: Menu not fond refresh page"));
          return;
        }
        findMenu.pages.push(findPage);
        updateMenuDriver({
          ...findMenu,
          pages: findMenu.pages.map((page) => page.id),
        })
          .then(() => resolve(findMenu))
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [pages, menus]
  );

  const removePageFromMenu = useCallback(
    (menuId: Menu["id"], pageId: Page["id"], menu?: Menu): Promise<Menu> =>
      new Promise((resolve, reject) => {
        const { updateMenu: updateMenuDriver } = driver;
        if (!updateMenuDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingMenus(true);
        const findMenu =
          typeof menu !== "undefined"
            ? menu
            : menus.find((m) => m.id === menuId);
        if (!findMenu) {
          reject(new Error("Joazco::: Menu not fond refresh page"));
          return;
        }
        findMenu.pages = findMenu.pages.filter((page) => page.id !== pageId);
        updateMenuDriver({
          ...findMenu,
          pages: findMenu.pages.map((page) => page.id),
        })
          .then(() => resolve(findMenu))
          .catch(reject)
          .finally(() => setLoadingMenus(false));
      }),
    [menus]
  );

  return {
    loadingMenus,
    menusIsListening,
    menus,
    getMenus,
    listenMenus,
    createMenu,
    updateMenu,
    removeMenu,
    addPageFromMenu,
    removePageFromMenu,
  };
};

export default useMenus;
