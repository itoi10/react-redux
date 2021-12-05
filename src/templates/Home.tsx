import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => dispatch(push("/login"))}>ログイン</button>
      <button onClick={() => dispatch(push("/signup"))}>サインアップ</button>
    </div>
  );
};

export default Home;
