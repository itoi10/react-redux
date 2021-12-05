import { signInAction } from "./actions";
import { push } from "connected-react-router";

export const signIn = () => {
  return async (dispatch: any, getState: any) => {
    // 現在のstoreの状態
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      // 非同期処理
      const res = await fetch("https://api.github.com/users/itoi10")
        .then((res) => res.json())
        .catch(() => null);

      const username = res.login;

      dispatch(
        signInAction({
          uid: "00001",
          username: username,
        })
      );

      dispatch(push("/"));
    }
  };
};
