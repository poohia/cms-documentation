import useConfig, { UseConfigRest } from "./useConfig";
import useLanguages, { UseLanguagesRest } from "./useLanguages";
import useConnection, { UseConnectionRest } from "./useConnection";
import useSeo, { UseSeoRest } from "./useSeo";
import usePages, { UsePagesRest } from "./usePages";
import useMenus, { UseMenusRest } from "./useMenus";
import useStylesheet, { UseStylesheetRest } from "./useStylesheet";

export type JoazcoContextProps = UseConfigRest &
  UseLanguagesRest &
  UseConnectionRest &
  UseSeoRest &
  UsePagesRest &
  UseMenusRest &
  UseStylesheetRest;

export {
  useConfig,
  useLanguages,
  useConnection,
  useSeo,
  usePages,
  useMenus,
  useStylesheet,
};
