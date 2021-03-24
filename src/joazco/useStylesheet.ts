import { useState, useCallback, useMemo, useEffect } from "react";
import useLanguages from "./useLanguages";
import useConfig from "./useConfig";
import { DriverStylesheet, LiveShare } from "../types";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const joazcoError = "Joazco::: Stylesheet service error";

const useStylesheet = (liveShare: LiveShare = null) => {
  const { locale } = useLanguages();
  const { enableCache } = useConfig();
  const tableCache = useMemo(() => `joazco.cache.stylesheet.${locale}`, [
    locale,
  ]);
  const loadCache = useCallback(() => {
    const stylesheetCache: string | null = localStorage.getItem(tableCache);
    if (!stylesheetCache) {
      return undefined;
    }
    return stylesheetCache;
  }, [tableCache]);
  const setCache = useCallback(
    (stylesheet: string) => localStorage.setItem(tableCache, stylesheet),
    [tableCache]
  );
  const [data, setData] = useState<string | undefined>(loadCache());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    const { getStylesheet, listenStylesheet } = (
      await import(`../drivers/${driver}/useStylesheet`)
    ).default() as DriverStylesheet;
    await getStylesheet().then((value) => {
      setData(value);
      setLoading(false);
    });
    if (liveShare) {
      listenStylesheet((value) => {
        if (value) {
          setData(value);
        } else {
          setError(joazcoError);
        }
      });
    }
  }, []);

  const insertStylesheet = useCallback(
    (stylesheet: string): Promise<void> =>
      new Promise((resolve, reject) => {
        setError(undefined);
        setLoading(true);
        import(`../drivers/${driver}/useStylesheet`).then((module) => {
          const {
            insertStylesheet: insertStylesheetDriver,
          } = module.default() as DriverStylesheet;
          insertStylesheetDriver(stylesheet)
            .then((value) => {
              setData(value);
              resolve();
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

  return { data, loading, error, loadData, insertStylesheet };
};

export default useStylesheet;
