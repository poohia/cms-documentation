// eslint no-restricted-imports: ["off"]
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}
export type Links = {
  website: string;
  git: string;
};
export type SEO = {
  title: string;
  description: string;
  keywords: string;
  links: Links;
  favIcon?: string;
};
export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
};
export type Menu = {
  id: string;
  title: string;
  caption?: string;
  pages: Page[];
};
export type MenuWithoutPage = Omit<Menu, "pages"> & {
  pages: string[];
};
export interface DriverConnection {
  onceCheckLogged: () => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}
export interface DriverMenus {
  getMenus: () => Promise<MenuWithoutPage[]>;
  listenMenus: (callback: (data: MenuWithoutPage[] | null) => void) => void;
  createMenu: (
    menuTitle: MenuWithoutPage["title"],
    menuCaption: MenuWithoutPage["caption"],
    id?: string
  ) => Promise<MenuWithoutPage>;
  updateMenu: (menu: MenuWithoutPage) => Promise<MenuWithoutPage>;
  removeMenu: (id: MenuWithoutPage["id"]) => Promise<void>;
}
export interface DriverPages {
  getPages: () => Promise<Page[]>;
  getPage: (id: Page["id"]) => Promise<Page>;
  getPageBySlug: (slug: Page["slug"]) => Promise<Page>;
  listenPageBySlug: (
    slug: Page["slug"],
    callback: (page: Page | null) => void
  ) => void;
  createPage: (page: Omit<Page, "id">, id?: string) => Promise<Page>;
  updatePage: (page: Page, id?: string) => Promise<Page>;
  removePage: (id: Page["id"]) => Promise<void>;
}
export interface DriverSeo {
  insertSeo: (data: SEO) => Promise<SEO>;
  getSeo: () => Promise<Partial<SEO>>;
  listenSeo: (callback: (data: Partial<SEO>) => void) => void;
}
export interface DriverStylesheet {
  insertStylesheet: (data: string) => Promise<string>;
  getStylesheet: () => Promise<string>;
  listenStylesheet: (callback: (data: string) => void) => void;
}
export interface Driver
  extends DriverConnection,
    DriverMenus,
    DriverPages,
    DriverSeo,
    DriverStylesheet {}
