import { useMemo } from "react";
import { useSeo as useSeoJoazco } from "../../../joazcov2";

const useHome = () => {
  const { data: seo, loading } = useSeoJoazco();

  const title = useMemo(() => seo?.title, [seo]);
  const description = useMemo(() => seo?.description, [seo]);
  const links = useMemo(() => seo?.links, [seo]);

  return {
    loading,
    title,
    description,
    links,
  };
};

export default useHome;
