import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import driver from "./drivers";
import App from "./App";
import JoazcoProvider from "./joazco";
import { defaultTheme, GlobalStyle } from "./styled-components/theme";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <JoazcoProvider driver={driver}>
        <App />
        <GlobalStyle theme={defaultTheme} />
      </JoazcoProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
