import { useState, useCallback, useMemo, useEffect } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverSeo, Links, SEO } from "../types";
import useQueryUrl from "../useQueryUrl";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Seo service error";

function serializeSeo(value: Partial<SEO>): SEO {
  const { title, description, keywords, links, favIcon } = value;
  const s: SEO = {} as SEO;
  s.title = title || "";
  s.description = description || "";
  s.keywords = keywords || "";
  s.links = {} as Links;
  s.links.website = links?.website || "";
  s.links.git = links?.git || "";
  s.favIcon = favIcon;
  return s;
}

export const useSeoWithoutHistory = () => {
  const [data, setData] = useState<SEO | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getSeo } = (
      await import(`../drivers/${driver}/useSeo`)
    ).default() as DriverSeo;
    await getSeo().then((value) => {
      setData(serializeSeo(value));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, loadData };
};

const useSeo = () => {
  const { locale } = useLanguages();
  const { enableCache } = useConfig();
  const tableCache = useMemo(() => `joazco.cache.seo.${locale}`, [locale]);
  const loadCache = useCallback(() => {
    const seoCache: string | null = localStorage.getItem(tableCache);
    if (!seoCache) {
      return undefined;
    }
    return JSON.parse(seoCache) as SEO;
  }, [tableCache]);
  const setCache = useCallback(
    (seo: SEO) => localStorage.setItem(tableCache, JSON.stringify(seo)),
    [tableCache]
  );
  const [data, setData] = useState<SEO | undefined>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setError(undefined);
    setLoading(true);
    const { getSeo, listenSeo } = (
      await import(`../drivers/${driver}/useSeo`)
    ).default() as DriverSeo;
    await getSeo()
      .then((value) => {
        setData(serializeSeo(value));
        setLoading(false);
      })
      .catch(() => {
        setError(joazcoError);
        setLoading(false);
      });
    if (liveShare) {
      listenSeo((value) => {
        if (value) {
          setData(serializeSeo(value));
        } else {
          setError(joazcoError);
        }
      });
    }
  }, []);

  const insertSeo = useCallback(
    (seo: SEO): Promise<SEO> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useSeo`).then((module) => {
          const { insertSeo: insertSeoDriver } = module.default() as DriverSeo;
          insertSeoDriver(seo)
            .then((value) => {
              setData(value);
              setLoading(false);
              resolve(value);
            })
            .catch(() => {
              setError(joazcoError);
              setLoading(false);
              reject(new Error(joazcoError));
            });
        });
      }),
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (enableCache && data) {
      setCache(data);
    }
  }, [data]);

  return { data, loading, error, loadData, insertSeo };
};

export default useSeo;
