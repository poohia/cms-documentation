import { useState, useCallback } from "react";
import { useJazzi } from "../../joazco";
import { Menu } from "../../types";

const useMenuConfiguration = (menu?: Menu) => {
  const {
    driver,
    logged,
    loadingMenus,
    loadingPages,
    menus,
    pages,
    createMenu,
    updateMenu,
    removeMenu,
    removePageFromMenu,
    addPageFromMenu,
  } = useJazzi();
  const [menuTitle, setMenuTitle] = useState<string>(menu ? menu.title : "");
  const [menuCaption, setMenuCaption] = useState<string>(
    menu ? menu.caption || "" : ""
  );
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = useCallback(() => {
    if (menuTitle !== "") {
      createMenu(menuTitle, menuCaption)
        .then(() => {
          setMenuTitle("");
          setMenuCaption("");
        })
        .catch((reason) => window.alert(reason));
    }
  }, [menuTitle, menuCaption]);

  const handleUpdateSubmit = useCallback(() => {
    if (menu) {
      updateMenu(menu.id, menuTitle, menuCaption).catch((reason) =>
        window.alert(reason)
      );
    }
  }, [menuTitle, menuCaption]);

  return {
    driver,
    logged,
    loadingPages,
    loadingMenus,
    menus,
    pages,
    menuTitle,
    menuCaption,
    filter,
    handleSubmit,
    handleUpdateSubmit,
    createMenu,
    updateMenu,
    removeMenu,
    removePageFromMenu,
    addPageFromMenu,
    setMenuTitle,
    setMenuCaption,
    setFilter,
  };
};

export default useMenuConfiguration;
