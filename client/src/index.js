import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import Routes from "./routes/Routes";
import { store } from "./store";
import theme from "./theme";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.register();
