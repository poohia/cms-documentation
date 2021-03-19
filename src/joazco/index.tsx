import React, { createContext, useContext, ReactNode } from "react";
import { Driver } from "../types";

import {
  JazziContextProps,
  useConfig,
  useLanguages,
  useConnection,
  useSeo,
  usePages,
  useMenus,
  useStylesheet,
} from "./hooks";

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useJazzi, CtxProvider] = createCtx<JazziContextProps>();

type JazziProviderProps = {
  driver: Partial<Driver>;
  children: ReactNode;
};

const JazziProvider = ({ driver, children }: JazziProviderProps) => {
  const useConfigRest = useConfig();
  const useLanguagesRest = useLanguages();
  const { logged, getCurrentUser, ...useConnectionRest } = useConnection(
    driver
  );
  const { loadingSeo, getSeo, ...useSeoRest } = useSeo(driver);
  const { loadingPages, getPages, pages, ...usePagesRest } = usePages(driver);
  const { loadingMenus, getMenus, ...useMenusRest } = useMenus(driver, pages);
  const {
    loadingStylesheet,
    getStylesheet,
    ...useStylesheetRest
  } = useStylesheet(driver);

  return (
    <CtxProvider
      value={{
        logged,
        pages,
        loadingSeo,
        loadingPages,
        loadingMenus,
        loadingStylesheet,
        getCurrentUser,
        getSeo,
        getPages,
        getMenus,
        getStylesheet,
        ...useConfigRest,
        ...useLanguagesRest,
        ...useConnectionRest,
        ...useSeoRest,
        ...usePagesRest,
        ...useMenusRest,
        ...useStylesheetRest,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export { useJazzi };
export default JazziProvider;
