import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//this is the root app component of our client side app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log("env is", process.env.NODE_ENV);
