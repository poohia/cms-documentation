import { Menu } from "../../types";

export interface Props {}
export type PanelMenuProps = {
  loading: boolean;
  menu: Menu;
  removeMenu: (id: Menu["id"]) => Promise<void>;
  handleUpdateSubmit: (id: string, title: string, caption: string) => void;
};
export type PopupBtnUpdateMenuProps = Omit<PanelMenuProps, "removeMenu"> & {};
