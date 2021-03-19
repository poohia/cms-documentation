import { useState, useEffect } from "react";
import { useJoazco } from "../../joazco";
import { SEO } from "../../types";

const useHome = () => {
  const {
    driver,
    logged,
    loadingSeo,
    icon,
    seo: seoJoazco,
    insertSeo,
  } = useJoazco();
  const [seo, setSeo] = useState<SEO>(seoJoazco);

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

  useEffect(() => {
    setSeo(seoJoazco);
  }, [seoJoazco]);

  return {
    driver,
    logged,
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

export default useHome;
