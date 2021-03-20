import { useState, useMemo, useEffect, useCallback } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverMenus, Menu, MenuWithoutPage, Page } from "../types";
import useQueryUrl from "../useQueryUrl";
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

const useNav = () => {
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
  const { loading: loadingPage, data: pages } = usePages();
  const [data, setData] = useState<Menu[]>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

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
          setData(menuFromMenuWithoutPage(value, []));
        } else {
          setError(joazcoError);
        }
      });
    }
  }, [pages]);

  useEffect(() => {
    if (!loadingPage) {
      loadData();
    }
  }, [loadingPage]);

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
  };
};

export default useNav;
