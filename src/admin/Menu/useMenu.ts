import { useJoazco } from "../../joazco";

const useMenu = () => {
  const {
    driver,
    logged,
    loadingSeo,
    loadingPages,
    loadingMenus,
    loadingStylesheet,
    icon,
    seo,
    enableFixtures,
    getCurrentUser,
    signOut,
    getSeo,
    getPages,
    getMenus,
    getStylesheet,
  } = useJoazco();

  if (logged === null) {
    getCurrentUser().catch();
  }
  if (loadingSeo === null) {
    getSeo();
  }

  if (loadingPages === null) {
    getPages();
  }

  if (loadingMenus === null && loadingPages === false) {
    getMenus();
  }

  if (loadingStylesheet === null) {
    getStylesheet();
  }

  return {
    driver,
    icon,
    seo,
    enableFixtures,
    signOut,
  };
};

export default useMenu;
