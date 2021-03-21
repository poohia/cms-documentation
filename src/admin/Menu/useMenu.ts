import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useConfig, useConnection, useSeo } from "../../joazcov2";

const useMenu = () => {
  const { push } = useHistory();
  const { driver, icon, enableFixtures } = useConfig();
  const { data: seo } = useSeo();
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
