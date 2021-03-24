import { useState, useEffect } from "react";
import { SEO } from "../../types";
import { useConfig, useConnection, useSeo as useSeoJoazco } from "../../joazco";

const useSeo = () => {
  const { driver, icon } = useConfig();
  const { loading: loadingConnection, data: user } = useConnection();
  const { loading: loadingSeo, data: seoJoazco, insertSeo } = useSeoJoazco();

  const [seo, setSeo] = useState<SEO>({
    title: "",
    description: "",
    keywords: "",
    links: {
      website: "",
      git: "",
    },
    favIcon: "",
  });

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
    if (seoJoazco) {
      setSeo(seoJoazco);
    }
  }, [seoJoazco]);

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
