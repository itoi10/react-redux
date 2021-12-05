import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { getUserId } from "../reducks/users/selectors";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const selector = useSelector(state => state)
  const uid = getUserId(selector)



  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <button onClick={() => dispatch(push("/login"))}>ログイン</button>
      <button onClick={() => dispatch(push("/signup"))}>サインアップ</button>
    </div>
  );
};

export default Home;
