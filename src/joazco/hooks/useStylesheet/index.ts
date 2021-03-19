import React, { useState, useCallback } from "react";
import { Driver } from "../../../types";

const joazcoError = "Joazco::: Stylesheet service error";

export type UseStylesheetRest = {
  loadingStylesheet: boolean | null;
  stylesheetIsListening: boolean;
  stylesheet: string;
  insertStylesheet: (data: string) => Promise<string>;
  fetchStylesheet: () => Promise<string>;
  listenStylesheet: () => void;
  getStylesheet: () => Promise<string>;
  setStylesheet: React.Dispatch<React.SetStateAction<string>>;
};

const useStylesheet = (driver: Partial<Driver>): UseStylesheetRest => {
  const [loadingStylesheet, setLoadingStylesheet] = useState<boolean | null>(
    null
  );
  const [stylesheetIsListening, setStylesheetIsListening] = useState<boolean>(
    false
  );
  const [stylesheet, setStylesheet] = useState<string>("");

  const insertStylesheet = useCallback(
    (data: string): Promise<string> =>
      new Promise((resolve, reject) => {
        const { insertStylesheet: insertStylesheetDriver } = driver;
        if (!insertStylesheetDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingStylesheet(true);
        insertStylesheetDriver(data)
          .then((value) => {
            setStylesheet(value);
            resolve(value);
          })
          .catch(reject)
          .finally(() => setLoadingStylesheet(false));
      }),
    []
  );

  const fetchStylesheet = useCallback(
    (): Promise<string> =>
      new Promise((resolve, reject) => {
        const { insertStylesheet: insertStylesheetDriver } = driver;
        if (!insertStylesheetDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingStylesheet(true);
        insertStylesheetDriver(stylesheet)
          .then((value) => {
            setStylesheet(value);
            resolve(value);
          })
          .catch(reject)
          .finally(() => setLoadingStylesheet(false));
      }),
    []
  );

  const getStylesheet = useCallback(
    (): Promise<string> =>
      new Promise((resolve, reject) => {
        const { getStylesheet: getStylesheetDriver } = driver;
        if (!getStylesheetDriver) {
          reject(new Error(joazcoError));
          return;
        }
        setLoadingStylesheet(true);
        getStylesheetDriver()
          .then((value) => {
            setStylesheet(value);
            resolve(value);
          })
          .catch(reject)
          .finally(() => setLoadingStylesheet(false));
      }),
    []
  );

  const listenStylesheet = useCallback((): void => {
    const { listenStylesheet: listenStylesheetDriver } = driver;
    if (!listenStylesheetDriver) {
      return;
    }
    if (!stylesheetIsListening) {
      setStylesheetIsListening(true);
    }
    listenStylesheetDriver((value) => {
      setStylesheet(value);
    });
  }, []);

  return {
    loadingStylesheet,
    stylesheetIsListening,
    stylesheet,
    insertStylesheet,
    fetchStylesheet,
    listenStylesheet,
    getStylesheet,
    setStylesheet,
  };
};

export default useStylesheet;
