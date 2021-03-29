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
    updatePagesFromMenu,
    removePageFromMenu,
  } = useNav();
  const [menuTitle, setMenuTitle] = useState<string>(menu ? menu.title : "");
  const [menuCaption, setMenuCaption] = useState<string>(
    menu ? menu.caption || "" : ""
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [appendPageMode, setAppendPageMode] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = useCallback(
    (title: string, caption: string): Promise<void> => {
      if (title !== "") {
        return createMenu(title, caption);
      }
      return Promise.resolve();
    },
    [menus]
  );

  const handleUpdateSubmit = useCallback(
    (id: string, title: string, caption: string) => {
      if (title === "") return;
      updateMenu(id, title, caption).catch((reason) => window.alert(reason));
    },
    [menus]
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
    editMode,
    appendPageMode,
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
    setEditMode,
    setAppendPageMode,
    updatePagesFromMenu,
  };
};

export default useMenuConfiguration;
