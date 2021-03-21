import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useConfig, useNav, useSeo } from "../../../joazcov2";
import { Menu } from "../../../types";

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
  const { icon } = useConfig();
  const { data: seo } = useSeo();
  const { data: menus } = useNav();
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

  const title = useMemo(() => seo?.title, [seo]);

  useEffect(() => {
    setOpenMenuResponsive(false);
    setActiveIndex(initActiveIndex(slug, menus));
  }, [slug]);

  return {
    icon,
    title,
    menus,
    activeIndex,
    slug,
    openMenuResponsive,
    handleClick,
    setOpenMenuResponsive,
  };
};

export default useMenu;
