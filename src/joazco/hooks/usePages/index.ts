import { useState, useCallback } from "react";
import { Driver, Page } from "../../../types";

const jazziError = "Joazco::: Pages service error";

export type UsePagesRest = {
  loadingPages: boolean | null;
  pages: Page[];
  getPages: () => Promise<Page[]>;
  getPage: (id: Page["id"]) => Page | undefined;
  getPageBySlug: (slug: Page["slug"]) => Page | undefined;
  getPageFromDatabase: (id: Page["id"]) => Promise<Page>;
  getPageBySlugFromDatabase: (slug: Page["slug"]) => Promise<Page>;
  listenPageBySlug: (
    slug: Page["slug"],
    callback: (page: Page | null) => void
  ) => void;
  createPage: (title: string, slug: string, id?: string) => Promise<Page>;
  updatePage: (page: Page, id?: string) => Promise<Page>;
  removePage: (id: Page["id"]) => Promise<Page[]>;
};

const usePages = (driver: Partial<Driver>): UsePagesRest => {
  const [loadingPages, setLoadingPages] = useState<boolean | null>(null);
  const [pages, setPages] = useState<Page[]>([]);

  const getPages = useCallback(
    (): Promise<Page[]> =>
      new Promise((resolve, reject) => {
        const { getPages: getPagesDriver } = driver;
        if (!getPagesDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingPages(true);
        getPagesDriver()
          .then((value) => {
            setPages(value);
            resolve(value);
          })
          .catch(reject)
          .finally(() => setLoadingPages(false));
      }),
    []
  );

  const getPage = useCallback(
    (id: Page["id"]): Page | undefined => pages.find((page) => page.id === id),
    [pages]
  );

  const getPageBySlug = useCallback(
    (slug: Page["slug"]): Page | undefined =>
      pages.find((page) => page.slug === slug),
    [pages]
  );

  const getPageFromDatabase = useCallback(
    (id: Page["id"]): Promise<Page> =>
      new Promise((resolve, reject) => {
        const { getPage: getPageDriver } = driver;
        if (!getPageDriver) {
          reject(new Error(jazziError));
          return;
        }
        getPageDriver(id).then(resolve).catch(reject);
      }),
    []
  );

  const getPageBySlugFromDatabase = useCallback(
    (slug: Page["slug"]): Promise<Page> =>
      new Promise((resolve, reject) => {
        const { getPageBySlug: getPageBySlugDriver } = driver;
        if (!getPageBySlugDriver) {
          reject(new Error(jazziError));
          return;
        }
        getPageBySlugDriver(slug).then(resolve).catch(reject);
      }),
    []
  );

  const listenPageBySlug = useCallback(
    (slug: Page["slug"], callback: (page: Page | null) => void): void => {
      const { listenPageBySlug: listenPageBySlugDriver } = driver;
      if (!listenPageBySlugDriver) {
        return;
      }
      listenPageBySlugDriver(slug, callback);
    },
    []
  );

  const createPage = useCallback(
    (title: string, slug: string, id?: string): Promise<Page> =>
      new Promise((resolve, reject) => {
        const p: Pick<Page, "title" | "slug" | "content"> = {
          title,
          slug,
          content: "",
        };
        const findPage = pages.find((pt) => pt.slug === slug);
        if (findPage) {
          reject(new Error("Joazco::: Slug already existing"));
          return;
        }
        const { createPage: createPageDriver } = driver;
        if (!createPageDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingPages(true);
        createPageDriver(p, id)
          .then((value) => {
            setPages(pages.concat(value));
            resolve(value);
          })
          .catch(reject)
          .finally(() => setLoadingPages(false));
      }),
    [pages]
  );

  const updatePage = useCallback(
    (page: Page, id?: string): Promise<Page> =>
      new Promise((resolve, reject) => {
        const { updatePage: updatePageDriver } = driver;
        if (!updatePageDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingPages(true);
        updatePageDriver(page, id)
          .then(() => resolve(page))
          .catch(reject)
          .finally(() => setLoadingPages(false));
      }),
    []
  );

  const removePage = useCallback(
    (id: Page["id"]): Promise<Page[]> =>
      new Promise((resolve, reject) => {
        const { removePage: removePageDriver } = driver;
        if (!removePageDriver) {
          reject(new Error(jazziError));
          return;
        }
        setLoadingPages(true);
        removePageDriver(id)
          .then(() => {
            const newPages = pages.filter((p) => p.id !== id);
            setPages(newPages);
            resolve(newPages);
          })
          .catch(reject)
          .finally(() => setLoadingPages(false));
      }),
    [pages]
  );

  return {
    loadingPages,
    pages,
    getPages,
    getPage,
    getPageBySlug,
    getPageFromDatabase,
    getPageBySlugFromDatabase,
    listenPageBySlug,
    createPage,
    updatePage,
    removePage,
  };
};

export default usePages;
