import { useState, useMemo, useEffect, useCallback } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverMenus, LiveShare, Menu, MenuWithoutPage, Page } from "../types";
import usePages from "./usePages";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Nav service error";

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

const useNav = (liveShare: LiveShare = null) => {
  const { locale } = useLanguages();
  const { enableCache } = useConfig();
  const tableCache = useMemo(() => `joazco.cache.nav.${locale}`, [locale]);
  const loadCache = useCallback(() => {
    const navCache: string | null = localStorage.getItem(tableCache);
    if (!navCache) {
      return [];
    }
    return JSON.parse(navCache) as Menu[];
  }, [tableCache]);
  const setCache = useCallback(
    (nav: Menu[]) => localStorage.setItem(tableCache, JSON.stringify(nav)),
    [tableCache]
  );
  const { data: pages } = usePages();
  const [data, setData] = useState<Menu[]>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const { getMenus, listenMenus } = (
      await import(`../drivers/${driver}/useMenus`)
    ).default() as DriverMenus;
    await getMenus()
      .then((value) => {
        setData(menuFromMenuWithoutPage(value, pages));
        setLoading(false);
      })
      .catch(() => {
        setError(joazcoError);
        setLoading(false);
      });
    if (liveShare) {
      listenMenus((value) => {
        if (value) {
          setData(menuFromMenuWithoutPage(value, pages));
        } else {
          setError(joazcoError);
        }
      });
    }
  }, [pages, data]);

  const createMenu = useCallback(
    (
      menuTitle: Menu["title"],
      menuCaption: Menu["caption"] = "",
      forceId?: string
    ): Promise<void> =>
      new Promise((resolve, reject) => {
        const findMenu = data.find((menu) => menu.title === menuTitle);
        if (findMenu) {
          reject(new Error("Joazco::: Menu name already existing "));
          return;
        }
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            createMenu: createMenuDriver,
          } = module.default() as DriverMenus;
          createMenuDriver(menuTitle, menuCaption, forceId)
            .then((value) => {
              setData(data.concat({ ...value, pages: [] }));
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
    [data]
  );

  const updateMenu = useCallback(
    (
      menuId: Menu["id"],
      menuTitle: Menu["title"],
      menuCaption: Menu["caption"] = ""
    ): Promise<void> =>
      new Promise((resolve, reject) => {
        const findMenu = data.find((menu) => menu.id === menuId);
        if (!findMenu) {
          reject(new Error("Joazco::: Menu not fond refresh page"));
          return;
        }
        setError(undefined);
        setLoading(true);
        const currTitle = String(findMenu.title);
        const currCaption = String(findMenu.caption);
        findMenu.title = menuTitle;
        findMenu.caption = menuCaption;
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            updateMenu: updateMenuDriver,
          } = module.default() as DriverMenus;
          updateMenuDriver({
            ...findMenu,
            pages: findMenu.pages.map((page) => page.id),
          })
            .then(() => {
              setLoading(false);
              resolve();
            })
            .catch(() => {
              findMenu.title = currTitle;
              findMenu.caption = currCaption;
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  const removeMenu = useCallback(
    (id: Menu["id"]): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            removeMenu: removeMenuDriver,
          } = module.default() as DriverMenus;
          removeMenuDriver(id)
            .then(() => {
              setData(data.filter((menu) => menu.id !== id));
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
    [data]
  );

  const addPageToMenu = useCallback(
    (menuId: Menu["id"], pageId: Page["id"], menu?: Menu): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            updateMenu: updateMenuDriver,
          } = module.default() as DriverMenus;
          const findMenu =
            typeof menu !== "undefined"
              ? menu
              : data.find((m) => m.id === menuId);
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
            .then(() => {
              setLoading(false);
              resolve();
            })
            .catch(() => {
              findMenu.pages = findMenu.pages.filter(
                (page) => page.id !== pageId
              );
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  const updatePagesFromMenu = useCallback(
    (menuId: Menu["id"], newPages: Page[], menu?: Menu): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            updateMenu: updateMenuDriver,
          } = module.default() as DriverMenus;
          const findMenu =
            typeof menu !== "undefined"
              ? menu
              : data.find((m) => m.id === menuId);
          if (!findMenu) {
            reject(new Error("Joazco::: Menu not fond refresh page"));
            return;
          }
          const oldPages = JSON.parse(JSON.stringify(findMenu.pages));
          findMenu.pages = newPages;
          updateMenuDriver({
            ...findMenu,
            pages: findMenu.pages.map((page) => page.id),
          })
            .then(() => {
              setLoading(false);
              resolve();
            })
            .catch(() => {
              findMenu.pages = oldPages;
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  const removePageFromMenu = useCallback(
    (menuId: Menu["id"], pageId: Page["id"], menu?: Menu): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useMenus`).then((module) => {
          const {
            updateMenu: updateMenuDriver,
          } = module.default() as DriverMenus;
          const findMenu =
            typeof menu !== "undefined"
              ? menu
              : data.find((m) => m.id === menuId);
          if (!findMenu) {
            reject(new Error("Joazco::: Menu not fond refresh page"));
            return;
          }
          findMenu.pages = findMenu.pages.filter((page) => page.id !== pageId);
          updateMenuDriver({
            ...findMenu,
            pages: findMenu.pages.map((page) => page.id),
          })
            .then(() => {
              setLoading(false);
              resolve();
            })
            .catch(() => {
              const findPage = pages.find((page) => page.id === pageId);
              if (findPage) {
                findMenu.pages.push(findPage);
              }
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  useEffect(() => {
    if (pages && pages.length > 0) {
      loadData();
    }
  }, [pages]);

  useEffect(() => {
    if (enableCache && data) {
      setCache(data);
    }
  }, [data]);

  return {
    data,
    loading,
    error,
    loadData,
    createMenu,
    updateMenu,
    removeMenu,
    addPageToMenu,
    updatePagesFromMenu,
    removePageFromMenu,
  };
};

export default useNav;
