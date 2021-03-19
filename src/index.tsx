import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import driver from "./drivers";
// import AppProvider from "./AppProvider";
import App from "./App";
import JazziProvider from "./joazco";
import { defaultTheme, GlobalStyle } from "./styled-components/theme";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <JazziProvider driver={driver}>
        {/* <AppProvider /> */}
        <App />
        <GlobalStyle theme={defaultTheme} />
      </JazziProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
