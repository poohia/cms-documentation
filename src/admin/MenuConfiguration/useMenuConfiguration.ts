import { useState, useCallback } from "react";
import { useJoazco } from "../../joazco";
import { useConnection, useNav } from "../../joazcov2";
import { Menu } from "../../types";

const useMenuConfiguration = (menu?: Menu) => {
  const {
    driver,
    loadingMenus,
    pages,
    createMenu,
    updateMenu,
    removeMenu,
    removePageFromMenu,
    addPageFromMenu,
  } = useJoazco();
  const { loading: loadingConnection, data: user } = useConnection();
  const { data: menus } = useNav();
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
    loadingConnection,
    user,
    driver,
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
