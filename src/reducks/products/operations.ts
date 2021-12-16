import { FirebaseTimestamp, firestore } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction } from "./actions";

const productsRef = firestore.collection("products");

// 商品一覧取得
export const fetchProducts = () => {
  return async (dispatch: any) => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList: any = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

// 商品登録
export const saveProducts = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  images: { id: string; path: string }[],
  sizes: { quantity: string; size: string }[]
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();

    const data: { [name: string]: any } = {
      updated_at: timestamp,
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10), // 第二引数は10進数という意味
      images: images,
      sizes: sizes,
    };

    // 新規作成時
    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id; // firestoreが自動採番した値を取得
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true }) // 更新
      .then(() => {
        // 成功したらトップへ
        dispatch(push("/"));
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
