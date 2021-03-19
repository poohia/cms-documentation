import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useMenuAdmin from "../../../admin/Menu/useMenu";
import { useJazzi } from "../../../joazco";
import { Menu } from "../../../types";
import useQueryUrl from "../../../useQueryUrl";

function initActiveIndex(slug: string, menus: Menu[]): number {
  if (typeof slug === "undefined") {
    return 0;
  }
  let index = 0;
  menus.forEach((menu, key) => {
    const findPage = menu.pages.find((page) => page.slug === slug);
    if (findPage) {
      index = key;
    }
  });
  return index;
}

const useMenu = () => {
  const {
    icon,
    seo,
    menus,
    loadingMenus,
    stylesheetIsListening,
    menusIsListening,
    listenStylesheet,
    listenMenus,
  } = useJazzi();
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);
  useMenuAdmin();
  const { slug } = useParams<{ slug: string }>();
  const [activeIndex, setActiveIndex] = useState<number>(
    initActiveIndex(slug, menus)
  );
  const [openMenuResponsive, setOpenMenuResponsive] = useState<boolean>(false);

  const handleClick = useCallback(
    (_e: any, titleProps: any) => {
      const { index } = titleProps;
      const newIndex = activeIndex === index ? -1 : index;

      setActiveIndex(newIndex);
    },
    [activeIndex]
  );

  useEffect(() => {
    setOpenMenuResponsive(false);
    setActiveIndex(initActiveIndex(slug, menus));
  }, [slug]);

  if (liveShare && !stylesheetIsListening) {
    listenStylesheet();
  }

  if (liveShare && !menusIsListening && loadingMenus === false) {
    listenMenus();
  }

  return {
    icon,
    seo,
    menus,
    loadingMenus,
    activeIndex,
    slug,
    openMenuResponsive,
    handleClick,
    setOpenMenuResponsive,
  };
};

export default useMenu;
