import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useConfig, useConnection, useSeo } from "../../joazco";

const useMenu = () => {
  const { push } = useHistory();
  const { driver, icon, enableFixtures } = useConfig();
  const { data: seo } = useSeo(driver !== "localstorage" && true);
  const { signOut } = useConnection();

  const title = useMemo(() => seo?.title || "", [seo]);

  return {
    driver,
    icon,
    title,
    enableFixtures,
    signOut,
    push,
  };
};

export default useMenu;
