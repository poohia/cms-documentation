import React from "react";
import { PanelMenuContainerProps } from "../../types";
import ListPages from "../ListPages";
import ListSubMenus from "../ListSubMenus";

const PanelMenuContainer = ({
  loading,
  appendPageMode,
  menu,
  pages,
  menus,
  addPageToMenu,
  removePageFromMenu,
  updatePagesFromMenu,
}: PanelMenuContainerProps) => {
  if (loading && appendPageMode) {
    return <div>loading...</div>;
  }

  if (appendPageMode) {
    return (
      <ListPages
        menu={menu}
        pages={pages}
        menus={menus}
        addPageToMenu={addPageToMenu}
      />
    );
  }

  return (
    <ListSubMenus
      menu={menu}
      removePageFromMenu={removePageFromMenu}
      updatePagesFromMenu={updatePagesFromMenu}
    />
  );
};

export default PanelMenuContainer;
