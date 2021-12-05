import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/reset.css";
import "./assets/style.css";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";

// storeを作成
export const store = createStore();

ReactDOM.render(
  // Providerでラップしてstoreを参照できるようにする
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
