import { useState, useEffect } from "react";
import * as cssValidator from "w3c-css-validator";
import {
  useConnection,
  useConfig,
  useStylesheet as useStylesheetJoazco,
} from "../../joazco";

const useStylesheet = () => {
  const { driver } = useConfig();
  const { loading: loadingConnection, data: user } = useConnection();
  const {
    loading: loadingStylesheet,
    data: stylesheet,
    insertStylesheet,
  } = useStylesheetJoazco();
  const [css, setCss] = useState<string>("");
  const [checkCss, setCheckCss] = useState<string>("");
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      cssValidator
        .validateText(css)
        .then((data) => {
          setCheckCss(JSON.stringify(data));
          if (data.valid) {
            setCanSave(true);
          } else {
            setCanSave(false);
          }
        })
        .catch(() => "error");
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [css]);

  useEffect(() => {
    if (stylesheet) {
      setCss(stylesheet);
    }
  }, [stylesheet]);

  return {
    loadingConnection,
    user,
    driver,
    loadingStylesheet,
    css,
    checkCss,
    canSave,
    setCss,
    setCheckCss,
    setCanSave,
    insertStylesheet,
  };
};

export default useStylesheet;
