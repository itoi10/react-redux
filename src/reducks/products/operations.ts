import { FirebaseTimestamp, firestore } from "../../firebase";
import { push } from "connected-react-router";

const productsRef = firestore.collection("products");

// 商品登録
export const saveProducts = (name: string, description: string, category: string, gender: string, price: string) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      id: "",
      created_at: timestamp,
      updated_at: timestamp,
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10), // 第二引数は10進数という意味
    };

    const ref = productsRef.doc();
    const id = ref.id; // firestoreが自動採番した値を取得
    data.id = id;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        // 成功したらトップへ
        dispatch(push("/"));
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
