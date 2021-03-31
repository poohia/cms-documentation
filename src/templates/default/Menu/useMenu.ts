import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useConfig, useConnection, useNav, useSeo } from "../../../joazco";
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
  const { slug } = useParams<{ slug: string }>();
  const { getQueryUrlVar } = useQueryUrl();
  const liveChange = useMemo(() => getQueryUrlVar("liveChange"), []);
  const { icon } = useConfig();
  const { data: user } = useConnection();
  const { data: seo } = useSeo(liveChange);
  const { data: menus, loading: loadingMenus } = useNav(liveChange);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openMenuResponsive, setOpenMenuResponsive] = useState<boolean>(false);

  const handleClick = useCallback(
    (_e: any, titleProps: any) => {
      const { index } = titleProps;
      const newIndex = activeIndex === index ? -1 : index;

      setActiveIndex(newIndex);
    },
    [activeIndex]
  );

  const title = useMemo(() => seo?.title, [seo]);

  useEffect(() => {
    setOpenMenuResponsive(false);
    setActiveIndex(initActiveIndex(slug, menus));
  }, [slug]);

  useEffect(() => {
    if (!loadingMenus) {
      setActiveIndex(initActiveIndex(slug, menus));
    }
  }, [slug, menus, loadingMenus]);

  return {
    icon,
    title,
    menus,
    activeIndex,
    slug,
    openMenuResponsive,
    user,
    handleClick,
    setOpenMenuResponsive,
  };
};

export default useMenu;
