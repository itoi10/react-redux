import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/reset.scss";
import "./assets/style.scss";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

// storeを作成
const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  // Providerでラップしてstoreを参照できるようにする
  <Provider store={store}>
    {/* ブラウザのURLの遷移履歴を管理できるようにする */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
