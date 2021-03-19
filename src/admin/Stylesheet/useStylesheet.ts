import { useState, useEffect } from "react";
import * as cssValidator from "w3c-css-validator";
import { useJazzi } from "../../joazco";

const useStylesheet = () => {
  const {
    driver,
    logged,
    loadingStylesheet,
    stylesheet,
    insertStylesheet,
  } = useJazzi();
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
    setCss(stylesheet);
  }, [stylesheet]);

  return {
    driver,
    logged,
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
