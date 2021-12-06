import { signInAction } from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, firestore } from "../../firebase/index";

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

// 新規ユーザー作成
export const signUp = (username:string, email:string, password:string, confirmPassword:string) => {
  return async (dispatch:any) => {
    // validation (more)
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert('必須項目が未入力です。')
      return false
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください。")
      return false
    }

    // Firebaseユーザー作成
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          // 新規ユーザー情報
          const userInitialData = {
            uid: uid,
            username: username,
            email: email,
            role: 'customer',
            created_at: timestamp,
            updated_at: timestamp,
          }

          // uidをキーとしてFirestoreに新規ユーザー情報保存
          firestore.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              // 保存が完了したらトップページに戻る
              dispatch(push('/'))
            })
        }
      })
  }
}
