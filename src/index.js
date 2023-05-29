import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import IntlProvider from "./intlProvider";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
// import { MaterialUIControllerProvider } from "./context";
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = document.getElementById("root");
render(
  <Provider store={store}>
     {/* <MaterialUIControllerProvider>
     </MaterialUIControllerProvider> */}
    <IntlProvider store={store} />
  </Provider>,
  root
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
