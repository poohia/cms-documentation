import { useState } from "react";
import { SEO } from "../../types";
import {
  useConfig,
  useConnection,
  useSeo as useSeoJoazco,
} from "../../joazcov2";

const useSeo = () => {
  const { driver, icon } = useConfig();
  const { loading: loadingConnection, data: user } = useConnection();
  const { loading: loadingSeo, data: seoJoazco, insertSeo } = useSeoJoazco();

  const [seo, setSeo] = useState<SEO>(
    seoJoazco ||
      ({
        title: "",
        description: "",
        keywords: "",
        links: {
          website: "",
          git: "",
        },
        favIcon: "",
      } as SEO)
  );

  const setTitle = (title: string) => {
    setSeo({ ...seo, title });
  };

  const setDescription = (description: string) => {
    setSeo({ ...seo, description });
  };

  const setKeywords = (keywords: string[]) => {
    setSeo({ ...seo, keywords: keywords.join(",") });
  };

  const setWebSite = (website: string) => {
    setSeo({ ...seo, links: { ...seo.links, website } });
  };

  const setgit = (git: string) => {
    setSeo({ ...seo, links: { ...seo.links, git } });
  };

  const setFavIcon = (favIcon: string) => {
    setSeo({ ...seo, favIcon });
  };

  const fetchSeo = () => {
    insertSeo(seo);
  };

  return {
    loadingConnection,
    user,
    driver,
    icon,
    loadingSeo,
    seo,
    fetchSeo,
    setTitle,
    setDescription,
    setKeywords,
    setWebSite,
    setgit,
    setFavIcon,
  };
};

export default useSeo;
