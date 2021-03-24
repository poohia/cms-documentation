import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { defaultTheme, GlobalStyle } from "./styled-components/theme";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
      <GlobalStyle theme={defaultTheme} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
