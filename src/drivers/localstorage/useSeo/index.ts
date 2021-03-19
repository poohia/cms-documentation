import { getLocale } from "../..";
import { DriverSeo, SEO } from "../../../types";

const useSeo = (): DriverSeo => {
  const locale = getLocale();
  const localStorageKey = `${locale}.seo`;

  const insertSeo = (data: SEO): Promise<SEO> =>
    new Promise((resolve, _reject) => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      setTimeout(() => {
        resolve(data);
      }, 200);
    });

  const getSeo = (): Promise<Partial<SEO>> =>
    new Promise((resolve, _reject) => {
      const seoDatabase = localStorage.getItem(localStorageKey);
      const seo: Partial<SEO> = seoDatabase ? JSON.parse(seoDatabase) : {};
      resolve(seo);
    });

  const listenSeo = (_callback: (data: Partial<SEO>) => void): void => {
    throw new Error("LiveChange function dosn't work with driver localstorage");
  };

  return { insertSeo, getSeo, listenSeo };
};

export default useSeo;
