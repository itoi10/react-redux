import { signInAction } from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, firestore } from "../../firebase/index";
import { UserState } from "./types";

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
      return false
    }

    // Firebaseサインイン
    auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        // 異常系
        if (!user) {
          alert('ユーザー情報を取得できませんでした。')
          return false
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
      // 異常系
      }).catch((error) => {
        alert('サインインに失敗しました。もう一度お試しください。' + error)
        return false;
      })
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
      return false
    }

    if (password.length < 6) {
      alert("パスワードは６文字以上で入力してください。")
      return false
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください。");
      return false;
    }

    // Firebaseユーザー作成
    return auth.createUserWithEmailAndPassword(email, password)
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
      // 異常系
      }).catch((error) => {
        alert('アカウント登録に失敗しました。' + error)
        return false;
      })
  };
};
