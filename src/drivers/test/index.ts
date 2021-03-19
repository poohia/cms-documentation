import { Driver } from "../../types";
import useConnection from "./useConnection";
import useMenu from "./useMenus";
import usePages from "./usePages";
import useSeo from "./useSeo";
import useStylesheet from "./useStylesheet";

const test: Driver = {
  ...useConnection(),
  ...useMenu(),
  ...usePages(),
  ...useSeo(),
  ...useStylesheet(),
};

export default test;
