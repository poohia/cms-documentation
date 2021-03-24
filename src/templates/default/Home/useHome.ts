import { useMemo } from "react";
import { useSeo as useSeoJoazco } from "../../../joazco";
import useQueryUrl from "../../../useQueryUrl";

const useHome = () => {
  const { getQueryUrlVar } = useQueryUrl();
  const liveChange = useMemo(() => getQueryUrlVar("liveChange"), []);
  const { data: seo, loading } = useSeoJoazco(liveChange);

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
