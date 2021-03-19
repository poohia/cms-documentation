import { DriverSeo, SEO } from "../../../types";

let seo: SEO = {
  title: "",
  description: "",
  keywords: "",
  links: {
    website: "",
    git: "",
  },
};

const useSeo = (): DriverSeo => {
  const insertSeo = (data: SEO): Promise<SEO> =>
    new Promise((resolve, _reject) => {
      seo = data;
      resolve(seo);
    });

  const getSeo = (): Promise<Partial<SEO>> =>
    new Promise((resolve, _reject) => {
      resolve(seo);
    });

  const listenSeo = (_callback: (data: Partial<SEO>) => void): void => {};

  return { insertSeo, getSeo, listenSeo };
};

export default useSeo;
