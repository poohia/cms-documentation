import { useMemo } from "react";
import { useJoazco } from "../../../joazco";
import useQueryUrl from "../../../useQueryUrl";

const useHome = () => {
  const {
    loadingSeo,
    loadingMenus,
    loadingPages,
    seoIsListening,
    seo: { title, description, links },
    listenSeo,
  } = useJoazco();
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  if (liveShare && !seoIsListening) {
    listenSeo();
  }

  return { loadingSeo, loadingMenus, loadingPages, title, description, links };
};

export default useHome;
