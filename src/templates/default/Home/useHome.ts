import { useMemo } from "react";
import { useJazzi } from "../../../joazco";
import useQueryUrl from "../../../useQueryUrl";

const useHome = () => {
  const {
    loadingSeo,
    loadingMenus,
    loadingPages,
    seoIsListening,
    seo: { title, description, links },
    listenSeo,
  } = useJazzi();
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  if (liveShare && !seoIsListening) {
    listenSeo();
  }

  return { loadingSeo, loadingMenus, loadingPages, title, description, links };
};

export default useHome;
