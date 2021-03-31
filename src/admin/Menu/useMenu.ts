import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useConfig, useConnection, useSeo } from "../../joazco";

const useMenu = () => {
  const { push } = useHistory();
  const { driver, icon, enableFixtures, enableCache, template } = useConfig();
  const { data: seo } = useSeo(driver !== "localstorage" && true);
  const { signOut } = useConnection();

  const [openMenuResponsive, setOpenMenuResponsive] = useState<boolean>(false);

  const title = useMemo(() => seo?.title || "", [seo]);

  return {
    driver,
    icon,
    title,
    enableFixtures,
    openMenuResponsive,
    enableCache,
    template,
    signOut,
    push,
    setOpenMenuResponsive,
  };
};

export default useMenu;
