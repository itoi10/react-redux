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

    // Firebaseサインイン
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
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
      }
    });
  };
};

// 新規ユーザー作成
export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: any) => {
    // validation (more)
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください。");
      return false;
    }

    // Firebaseユーザー作成
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
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
    });
  };
};
