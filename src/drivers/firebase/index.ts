import { Driver } from "../../types";
import useConnection from "./useConnection";
import useMenu from "./useMenus";
import usePages from "./usePages";
import useSeo from "./useSeo";
import useStylesheet from "./useStylesheet";

const firebase: Driver = {
  ...useConnection(),
  ...useMenu(),
  ...usePages(),
  ...useSeo(),
  ...useStylesheet(),
};

export default firebase;
