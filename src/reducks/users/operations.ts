import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, firestore } from "../../firebase/index";
import { UserState } from "./types";

// 認証リッスン
export const listenAuthState = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged((user) => {
      // 未ログインだったらサインイン画面に遷移
      if (!user) {
        dispatch(push("/signin"));
        return false;
      }

      // Firestoreからユーザー情報取得
      const uid = user.uid;
      firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.data() as UserState;
          // store更新
          dispatch(
            signInAction({
              role: data.role,
              uid: data.uid,
              username: data.username,
            })
          );
        });
    });
  };
};

// サインイン
export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    // validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    // メールアドレスチェック http://emailregex.com/
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      alert("メールアドレスの形式が間違っています");
      return false;
    }

    // Firebaseサインイン
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        // 異常系
        if (!user) {
          alert("ユーザー情報を取得できませんでした。");
          return false;
        }

        const uid = user.uid;
        // Firestoreからユーザー情報取得
        firestore
          .collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as UserState;
            // store更新
            dispatch(
              signInAction({
                role: data.role,
                uid: data.uid,
                username: data.username,
              })
            );
            // トップページへ遷移
            dispatch(push("/"));
          });
      })
      .catch((err) => {
        // 異常系
        alert("サインインに失敗しました。もう一度お試しください。" + err);
        return false;
      });
  };
};

// 新規ユーザー作成
export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: any) => {
    // validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    // メールアドレスチェック http://emailregex.com/
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      alert("メールアドレスの形式が間違っています");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは６文字以上で入力してください。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください。");
      return false;
    }

    // Firebaseユーザー作成
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          // 新規ユーザー情報
          const userInitialData = {
            uid: uid,
            username: username,
            email: email,
            role: "customer",
            created_at: timestamp,
            updated_at: timestamp,
          };

          // uidをキーとしてFirestoreに新規ユーザー情報保存
          firestore
            .collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              // 保存が完了したらトップページに戻る
              dispatch(push("/"));
            });
        }
      })
      .catch((err) => {
        // 異常系
        alert("アカウント登録に失敗しました。もう一度お試しください。" + err);
        return false;
      });
  };
};

// サインアウト
export const signOut = () => {
  // Firebaseサインアウト
  return async (dispatch: any) => {
    auth.signOut().then(() => {
      // storeを初期状態へ
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

// パスワードリセットメール送信
export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    if (email === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      alert("メールアドレスの形式が間違っています");
      return false;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("入力されたメールアドレスにパスワードリセット用のメールをお送りしました。");
        dispatch(push("/signin"));
      })
      .catch((err) => {
        alert("パスワードリセットに失敗しました。もう一度お試しください。" + err);
      });
  };
};

// 雛形
// export const func = () => {
//   return async (dispatch: any) => {
//   }
// }
