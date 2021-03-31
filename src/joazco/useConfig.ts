import { useMemo } from "react";

export type UseConfigRest = {
  driver: "firebase" | "localstorage" | "test" | string;
  env: "production" | "development" | "test";
  template: string;
  enableFixtures: boolean;
  enableCache: boolean;
  icon?: string;
};

const useConfig = (): UseConfigRest => {
  const driver: "firebase" | string = useMemo(
    () => process.env.REACT_APP_JOAZCO_CMS_DRIVER || "localstorage",
    []
  );
  const icon: string = useMemo(
    () =>
      process.env.REACT_APP_JOAZCO_ICON ||
      "https://firebasestorage.googleapis.com/v0/b/cms-documentation-83c06.appspot.com/o/logo.png?alt=media&token=e483a55a-6586-4f77-83e4-4f749cc9f91f",
    []
  );
  const env: "production" | "development" | "test" = useMemo(
    () => process.env.NODE_ENV || "development",
    []
  );
  const template = useMemo(
    () => process.env.REACT_APP_JOAZCO_TEMPLATE || "default",
    []
  );
  const enableFixtures = useMemo(() => {
    const envEnableFixtures = process.env.REACT_APP_ENABLE_FIXTURES;
    if (!envEnableFixtures || envEnableFixtures === "false") {
      return false;
    }
    if (envEnableFixtures === "true") {
      return true;
    }
    return false;
  }, []);
  const enableCache = useMemo(() => {
    const envEnableCache = process.env.REACT_APP_JOAZCO_ENABLE_CACHE;
    if (!envEnableCache || envEnableCache === "false") {
      return false;
    }
    if (envEnableCache === "true") {
      return true;
    }
    return false;
  }, []);

  return { driver, icon, env, template, enableFixtures, enableCache };
};

export default useConfig;
