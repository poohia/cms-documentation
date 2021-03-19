import { useState, useMemo, useEffect, useCallback } from "react";
import { DriverMenus, Menu, MenuWithoutPage, Page } from "../types";
import useQueryUrl from "../useQueryUrl";
import usePages from "./usePages";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";

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
  const { loading: loadingPage, data: pages } = usePages();
  const [data, setData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getMenus, listenMenus } = (
      await import(`../drivers/${driver}/useMenus`)
    ).default() as DriverMenus;
    await getMenus().then((value) => {
      setData(menuFromMenuWithoutPage(value, pages));
      setLoading(false);
    });
    if (liveShare) {
      listenMenus(
        (value) => value && setData(menuFromMenuWithoutPage(value, []))
      );
    }
  }, [pages]);

  useEffect(() => {
    if (!loadingPage) {
      loadData();
    }
  }, [loadingPage]);

  return {
    data,
    loading,
    loadData,
  };
};

export default useNav;
