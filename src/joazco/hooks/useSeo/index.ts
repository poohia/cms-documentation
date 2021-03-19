import React, { useState, useCallback } from "react";
import { Driver, Links, SEO } from "../../../types";

const joazcoError = "Joazco::: Seo service error";

export type UseSeoRest = {
  loadingSeo: boolean | null;
  seoIsListening: boolean;
  seo: SEO;
  insertSeo: (data: SEO) => Promise<SEO>;
  fetchSeo: () => Promise<SEO>;
  listenSeo: () => void;
  getSeo: () => Promise<SEO>;
  setSeo: React.Dispatch<React.SetStateAction<SEO>>;
};

const useSeo = (driver: Partial<Driver>): UseSeoRest => {
  const [loadingSeo, setLoadingSeo] = useState<boolean | null>(null);
  const [seoIsListening, setSeoIsListening] = useState<boolean>(false);
  const [seo, setSeo] = useState<SEO>({
    title: "",
    description: "",
    keywords: "",
    links: {
      website: "",
      git: "",
    },
  });

  const setSeoFromDatabase = useCallback((value: Partial<SEO>): SEO => {
    const { title, description, keywords, links, favIcon } = value;
    const s: SEO = {} as SEO;
    s.title = title || "";
    s.description = description || "";
    s.keywords = keywords || "";
    s.links = {} as Links;
    s.links.website = links?.website || "";
    s.links.git = links?.git || "";
    s.favIcon = favIcon;
    setSeo(s);
    return s;
  }, []);

  const getSeo = useCallback(
    (): Promise<SEO> =>
      new Promise((resolve, reject) => {
        const { getSeo: getSeoDriver } = driver;
        if (!getSeoDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingSeo(true);
        getSeoDriver()
          .then((value) => {
            const s = setSeoFromDatabase(value);
            setTimeout(() => setLoadingSeo(false), 200);
            resolve(s);
          })
          .catch((reason) => {
            reject(reason);
            setLoadingSeo(false);
          });
      }),
    [seo]
  );

  const insertSeo = useCallback(
    (data: SEO): Promise<SEO> =>
      new Promise((resolve, reject) => {
        const { insertSeo: insertSeoDriver } = driver;
        if (!insertSeoDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingSeo(true);
        insertSeoDriver(data)
          .then((value) => {
            const s = setSeoFromDatabase(value);
            resolve(s);
          })
          .catch(reject)
          .finally(() => setLoadingSeo(false));
      }),
    []
  );

  const fetchSeo = useCallback(
    (): Promise<SEO> =>
      new Promise((resolve, reject) => {
        const { insertSeo: insertSeoDriver } = driver;
        if (!insertSeoDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingSeo(true);
        insertSeoDriver(seo)
          .then((value) => {
            const s = setSeoFromDatabase(value);
            resolve(s);
          })
          .catch(reject)
          .finally(() => setLoadingSeo(false));
      }),
    []
  );

  const listenSeo = useCallback((): void => {
    const { listenSeo: listenSeoDriver } = driver;
    if (!listenSeoDriver) {
      return;
    }
    if (!seoIsListening) {
      setSeoIsListening(true);
    }
    listenSeoDriver((value) => {
      setSeoFromDatabase(value);
    });
  }, []);

  return {
    loadingSeo,
    seoIsListening,
    seo,
    insertSeo,
    fetchSeo,
    listenSeo,
    getSeo,
    setSeo,
  };
};

export default useSeo;
