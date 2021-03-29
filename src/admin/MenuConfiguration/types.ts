import { Page, Menu } from "../../types";

export interface Props {}
export type PanelMenuProps = {
  loading: boolean;
  menu: Menu;
  menus: Menu[];
  pages: Page[];
  removeMenu: (id: Menu["id"]) => Promise<void>;
  handleUpdateSubmit: (id: string, title: string, caption: string) => void;
  addPageToMenu: (
    menuId: Menu["id"],
    pageId: Page["id"],
    menu?: Menu
  ) => Promise<void>;
  removePageFromMenu: (
    menuId: Menu["id"],
    pageId: Page["id"],
    menu?: Menu
  ) => Promise<void>;
  updatePagesFromMenu: (
    menuId: Menu["id"],
    newPages: Page[],
    menu?: Menu
  ) => Promise<void>;
};
export type PopupBtnUpdateMenuProps = Omit<
  PanelMenuProps,
  "removeMenu" | "removePageFromMenu"
> & {};

export type ListPageProps = Pick<PanelMenuProps, "menu" | "menus" | "pages"> & {
  addPageToMenu: (menuId: string, pageId: string) => void;
};

export type ListSubMenusProps = Pick<
  PanelMenuProps,
  "menu" | "removePageFromMenu" | "updatePagesFromMenu" | "menu"
>;
export type SortableItemProps = ListSubMenusProps & {
  page: Page;
};
export type PanelMenuContainerProps = PanelMenuProps & {
  appendPageMode: boolean;
};
