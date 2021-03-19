import { DriverPages, Page } from "../../../types";

const databaseError = "Test::: Error database connection";
const pages: Page[] = [];

const usePages = (): DriverPages => {
  const getPages = (): Promise<Page[]> =>
    new Promise((resolve, _reject) => {
      resolve(pages);
    });

  const listenPages = (_callback: (pages: Page[]) => void) => {};

  const getPage = (id: Page["id"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      const findPage = pages.find((p) => p.id === id);
      if (findPage) {
        resolve(findPage);
      } else {
        reject(new Error(databaseError));
      }
    });

  const getPageBySlug = (slug: Page["slug"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      const findPage = pages.find((p) => p.slug === slug);
      if (findPage) {
        resolve(findPage);
      } else {
        reject(new Error(databaseError));
      }
    });

  const listenPageBySlug = (
    _slug: Page["slug"],
    _callback: (page: Page | null) => void
  ): void => {};

  const createPage = (page: Omit<Page, "id">, id?: string): Promise<Page> =>
    new Promise((resolve, _reject) => {
      const finalKey = id || "1234";
      const newPage: Page = { ...page, id: finalKey };
      pages.push(newPage);
      resolve(newPage);
    });

  const updatePage = (page: Page, _id?: string): Promise<Page> =>
    new Promise((resolve, reject) => {
      const findPage = pages.find((p) => p.id === page.id);
      if (findPage) {
        findPage.title = page.title;
        findPage.slug = page.slug;
        findPage.content = page.content;
        resolve(findPage);
      } else {
        reject(new Error(databaseError));
      }
    });

  const removePage = (id: Page["id"]): Promise<void> =>
    new Promise((resolve, reject) => {
      const findPage = pages.find((p) => p.id === id);
      if (findPage) {
        resolve();
      } else {
        reject(new Error(databaseError));
      }
    });

  return {
    getPages,
    listenPages,
    getPage,
    getPageBySlug,
    listenPageBySlug,
    createPage,
    updatePage,
    removePage,
  };
};

export default usePages;
