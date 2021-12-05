import React from "react";
import { Signup } from "./templates";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "./reducks/users/actions";

const App: React.FC = () => {
  // storeの値変更
  const dispatch = useDispatch();

  // storeの値参照
  const selector = useSelector((state: any) => state);
  console.log(selector.users);

  return (
    <>
      <Signup />
      <button onClick={() => dispatch(signInAction({ uid: "00001", username: "testuser" }))}>Signin Test</button>
    </>
  );
};

export default App;
