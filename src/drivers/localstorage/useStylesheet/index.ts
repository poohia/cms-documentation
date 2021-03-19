import { getLocale } from "../..";

const useStylesheet = () => {
  const locale = getLocale();
  const localStorageKey = `${locale}.stylesheet`;
  const insertStylesheet = (data: string): Promise<string> =>
    new Promise((resolve, _reject) => {
      localStorage.setItem(localStorageKey, data);
      setTimeout(() => {
        resolve(data);
      }, 200);
    });

  const getStylesheet = (): Promise<string> =>
    new Promise((resolve, _reject) => {
      const stylesheetDatabase = localStorage.getItem(localStorageKey);
      resolve(stylesheetDatabase || "");
    });

  const listenStylesheet = (_callback: (data: string) => void): void => {
    throw new Error("LiveChange function dosn't work with driver localstorage");
  };

  return { insertStylesheet, getStylesheet, listenStylesheet };
};

export default useStylesheet;
