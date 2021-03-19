import { getLocale } from "../..";
import { Page } from "../../../types";

const databaseError = "LocalStorage::: Error database connection";

const usePages = () => {
  const locale = getLocale();
  const localStorageKey = `${locale}.pages`;

  const getPages = (): Promise<Page[]> =>
    new Promise((resolve, _reject) => {
      const pagesDatabase = localStorage.getItem(localStorageKey);
      const pages = pagesDatabase ? JSON.parse(pagesDatabase) : [];
      resolve(pages);
    });

  const getPage = (id: Page["id"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      getPages().then((pages) => {
        const findPage = pages.find((p) => p.id === id);
        if (findPage) {
          resolve(findPage);
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  const getPageBySlug = (slug: Page["slug"]): Promise<Page> =>
    new Promise((resolve, reject) => {
      getPages().then((pages) => {
        const findPage = pages.find((p) => p.slug === slug);
        if (findPage) {
          resolve(findPage);
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  const listenPageBySlug = (
    _slug: Page["slug"],
    _callback: (page: Page | null) => void
  ): void => {
    throw new Error("LiveChange function dosn't work with driver localstorage");
  };

  const createPage = (page: Omit<Page, "id">, id?: string): Promise<Page> =>
    new Promise((resolve, _reject) => {
      getPages().then((pages) => {
        const finalId: string =
          pages.length > 0
            ? Number(Number(pages[pages.length - 1].id) + 1).toString()
            : "0";
        const newPage: Page = { ...page, id: id || finalId };
        pages.push(newPage);
        localStorage.setItem(localStorageKey, JSON.stringify(pages));
        resolve(newPage);
      });
    });

  const updatePage = (page: Page, _id?: string): Promise<Page> =>
    new Promise((resolve, reject) => {
      getPages().then((pages) => {
        const findPage = pages.find((p) => p.id === page.id);
        if (findPage) {
          findPage.title = page.title;
          findPage.slug = page.slug;
          findPage.content = page.content;
          localStorage.setItem(localStorageKey, JSON.stringify(pages));
          setTimeout(() => resolve(findPage), 200);
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  const removePage = (id: Page["id"]): Promise<void> =>
    new Promise((resolve, reject) => {
      getPages().then((pages) => {
        const findPage = pages.find((p) => p.id === id);
        if (findPage) {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(pages.filter((p) => p.id !== id))
          );
          resolve();
        } else {
          reject(new Error(databaseError));
        }
      });
    });

  return {
    getPages,
    getPage,
    getPageBySlug,
    listenPageBySlug,
    createPage,
    updatePage,
    removePage,
  };
};

export default usePages;
