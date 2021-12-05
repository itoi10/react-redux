import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../reducks/users/actions";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state: any) => state);
  console.log(selector.router);

  // connected-react-routerを使ってみた
  // https://qiita.com/hiroya8649/items/34979f2008cf92c110ff

  return (
    <div>
      <h2>ログイン</h2>
      {/* '/'に遷移する */}
      <button onClick={() => {
        dispatch(signInAction({uid: "00001", username: "taro" }))
        dispatch(push("/"))
      }}>ログインする</button>
    </div>
  );
};

export default Login;
