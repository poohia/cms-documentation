import { useState, useCallback } from "react";
import { useConnection, useConfig, usePages, useNav } from "../../joazco";
import { Menu } from "../../types";

const useMenuConfiguration = (menu?: Menu) => {
  const { driver } = useConfig();
  const { data: pages } = usePages();
  const { loading: loadingConnection, data: user } = useConnection();
  const {
    loading: loadingMenus,
    data: menus,
    createMenu,
    updateMenu,
    removeMenu,
    addPageToMenu,
    removePageFromMenu,
  } = useNav();
  const [menuTitle, setMenuTitle] = useState<string>(menu ? menu.title : "");
  const [menuCaption, setMenuCaption] = useState<string>(
    menu ? menu.caption || "" : ""
  );
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = useCallback(
    (title: string, caption: string) => {
      if (title !== "") {
        createMenu(title, caption)
          .then(() => {
            setMenuTitle("");
            setMenuCaption("");
          })
          .catch((reason) => window.alert(reason));
      }
    },
    [menus]
  );

  const handleUpdateSubmit = useCallback(
    (id: string, title: string, caption: string) => {
      if (title === "") return;
      updateMenu(id, title, caption).catch((reason) => window.alert(reason));
    },
    []
  );

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
    setMenuTitle,
    setMenuCaption,
    setFilter,
    addPageToMenu,
  };
};

export default useMenuConfiguration;
