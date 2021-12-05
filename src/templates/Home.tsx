import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getUserId, getUsername } from "../reducks/users/selectors";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名；{username}</p>
      <button onClick={() => dispatch(push("/login"))}>ログイン</button>
      <button onClick={() => dispatch(push("/signup"))}>サインアップ</button>
    </div>
  );
};

export default Home;
