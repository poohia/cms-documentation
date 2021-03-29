import { useState, useMemo, useCallback, useEffect } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverPages, LiveShare, Page } from "../types";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Pages service error";

const usePages = (liveShare: LiveShare = null) => {
  const { locale } = useLanguages();
  const { enableCache } = useConfig();
  const tableCache = useMemo(() => `joazco.cache.pages.${locale}`, [locale]);
  const loadCache = useCallback(() => {
    const pagesCache: string | null = localStorage.getItem(tableCache);
    if (!pagesCache) {
      return [];
    }
    return JSON.parse(pagesCache) as Page[];
  }, [tableCache]);
  const setCache = useCallback(
    (pages: Page[]) => localStorage.setItem(tableCache, JSON.stringify(pages)),
    [tableCache]
  );
  const [data, setData] = useState<Page[]>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const { getPages, listenPages } = (
      await import(`../drivers/${driver}/usePages`)
    ).default() as DriverPages;
    await getPages()
      .then((value) => {
        setData(value);
        setLoading(false);
      })
      .catch(() => {
        setError(joazcoError);
        setLoading(false);
      });
    if (liveShare) {
      listenPages((value) => {
        if (value) {
          setData(value);
        } else {
          setError(joazcoError);
        }
      });
    }
  }, []);

  const createPage = useCallback(
    (title: string, slug: string, id?: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const p: Pick<Page, "title" | "slug" | "content"> = {
          title,
          slug,
          content: "",
        };
        const findPage = data && data.find((pt) => pt.slug === slug);
        if (findPage) {
          reject(new Error("Joazco::: Slug already existing"));
          return;
        }
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/usePages`).then((module) => {
          const {
            createPage: createPageDriver,
          } = module.default() as DriverPages;
          createPageDriver(p, id)
            .then((value) => {
              setData(data.concat([value]));
              setLoading(false);
              resolve();
            })
            .catch(() => {
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  const removePage = useCallback(
    (id: Page["id"]): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/usePages`).then((module) => {
          const {
            removePage: removePageDriver,
          } = module.default() as DriverPages;
          removePageDriver(id)
            .then(() => {
              setData(data.filter((page) => page.id !== id));
              setLoading(false);
              resolve();
            })
            .catch(() => {
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    [data]
  );

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (enableCache && data) {
      setCache(data);
    }
  }, [data]);

  return {
    data,
    loading,
    error,
    loadData,
    createPage,
    removePage,
  };
};

export default usePages;
