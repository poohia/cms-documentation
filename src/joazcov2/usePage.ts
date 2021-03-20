import { useState, useMemo, useCallback, useEffect } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverPages, Page } from "../types";
import useQueryUrl from "../useQueryUrl";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Page service error";

const usePage = ({ id, slug }: { id?: string; slug?: string }) => {
  const { locale } = useLanguages();
  const { enableCache } = useConfig();
  const tableCache = useMemo(
    () => `joazco.cache.page.${id || slug}.${locale}`,
    [id, slug, locale]
  );
  const loadCache = useCallback(() => {
    const pageCache: string | null = localStorage.getItem(tableCache);
    if (!pageCache) {
      return undefined;
    }
    return JSON.parse(pageCache) as Page;
  }, [tableCache]);
  const setCache = useCallback(
    (page: Page) => localStorage.setItem(tableCache, JSON.stringify(page)),
    [tableCache]
  );
  const [data, setData] = useState<Page | undefined>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const { getPage, getPageBySlug, listenPageBySlug } = (
      await import(`../drivers/${driver}/usePages`)
    ).default() as DriverPages;
    if (id) {
      await getPage(id)
        .then((value) => {
          setData(value);
          setLoading(false);
        })
        .catch(() => {
          setError(joazcoError);
          setLoading(false);
        });
    } else if (slug) {
      await getPageBySlug(slug)
        .then((value) => {
          setData(value);
          setLoading(false);
        })
        .catch(() => {
          setError(joazcoError);
          setLoading(false);
        });
    }

    if (liveShare && slug) {
      listenPageBySlug(slug, (value) => {
        if (value) {
          setData(value);
        } else {
          setError(joazcoError);
        }
      });
    }
  }, [id, slug]);

  useEffect(() => {
    loadData();
  }, [id, slug]);

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
  };
};

export default usePage;
