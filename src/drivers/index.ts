import { Driver } from "../types";

const d = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
const driver: Partial<Driver> = {};

import(`./${d}/`).then((value) => {
  const { default: defaultObject } = value;
  Object.keys(defaultObject).forEach((key) => {
    // @ts-ignore
    driver[key] = defaultObject[key];
  });
});

export function getLocale(): string {
  return process.env.NODE_ENV === "test"
    ? "test"
    : localStorage.getItem("locale") || "en";
}

export default driver;
