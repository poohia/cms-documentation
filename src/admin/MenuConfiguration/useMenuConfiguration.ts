import { useState, useCallback } from "react";
import { useJoazco } from "../../joazco";
import { useConnection, useConfig, usePages, useNav } from "../../joazcov2";
import { Menu } from "../../types";

const useMenuConfiguration = (menu?: Menu) => {
  const { removePageFromMenu, addPageFromMenu } = useJoazco();
  const { driver } = useConfig();
  const { data: pages } = usePages();
  const { loading: loadingConnection, data: user } = useConnection();
  const {
    loading: loadingMenus,
    data: menus,
    createMenu,
    updateMenu,
    removeMenu,
  } = useNav();
  const [menuTitle, setMenuTitle] = useState<string>(menu ? menu.title : "");
  const [menuCaption, setMenuCaption] = useState<string>(
    menu ? menu.caption || "" : ""
  );
  const [filter, setFilter] = useState<string>("");

  // console.log(menus);

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
    addPageFromMenu,
    setMenuTitle,
    setMenuCaption,
    setFilter,
  };
};

export default useMenuConfiguration;
