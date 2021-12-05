import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import * as History from "history";

// history ブラウザがどこのパスにいるのかという情報

export default function createStore(history: History.History<unknown>) {
  return reduxCreateStore(
    // 分割したReducersをまとめる
    combineReducers({
      router: connectRouter(history), // パスの情報をstoreで管理できるようにする
      users: UsersReducer,
    }),
    // ミドルウェア設定
    applyMiddleware(routerMiddleware(history))
  );
}
