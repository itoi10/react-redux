import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import { getIsSignedIn } from "./reducks/users/selectors";

interface Props {
  children: React.ReactNode;
}

// 認証確認. サインイン中に表示したい要素はこのコンポーネントでラッピングする
const Auth: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  // サインインしていなければfirebaseのonAuthStateChangedで認証確認し,NGならサインイン画面に遷移させる
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <>{props.children}</>;
  }
};

export default Auth;
