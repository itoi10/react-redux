import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import { ProductsReducer } from "../products/reducers";
import * as History from "history";
import thunk from "redux-thunk";

// history ブラウザがどこのパスにいるのかという情報
// thunk 非同期処理を待つ

export default function createStore(history: History.History<unknown>) {
  return reduxCreateStore(
    // 分割したReducersをまとめる
    combineReducers({
      router: connectRouter(history), // パスの情報をstoreで管理できるようにする
      users: UsersReducer,
      products: ProductsReducer,
    }),
    // ミドルウェア設定
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
