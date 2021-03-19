let styleSheet: string = "";

const useStylesheet = () => {
  const insertStylesheet = (data: string): Promise<string> =>
    new Promise((resolve, _reject) => {
      styleSheet = data;
      resolve(styleSheet);
    });

  const getStylesheet = (): Promise<string> =>
    new Promise((resolve, _reject) => {
      resolve(styleSheet);
    });

  const listenStylesheet = (_callback: (data: string) => void): void => {};

  return { insertStylesheet, getStylesheet, listenStylesheet };
};

export default useStylesheet;
