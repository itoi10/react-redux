import { FirebaseTimestamp, firestore } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction, deleteProductAction } from "./actions";
import { batch } from "react-redux";

const productsRef = firestore.collection("products");

// 商品削除
export const deleteProduct = (id: number | string) => {
  return async (dispatch: any, getState: any) => {
    productsRef
      .doc(id.toString())
      .delete()
      .then(() => {
        const prevProducts: any[] = getState().products.list;
        const nextProducts = prevProducts.filter((product) => product.id !== id);
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

/**
 * 商品情報取得
 * 引数を指定した場合はその条件にあるもののみ取得する
 * @param gender "" or "all" or "male" or "female"
 * @param category "" or カテゴリー
 * @returns
 */
export const fetchProducts = (gender: string, category: string) => {
  return async (dispatch: any) => {
    let query = productsRef.orderBy("updated_at", "desc");
    console.log("gen " + gender);
    console.log("cat " + category);
    // 検索条件指定
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
      const productList: any = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

// 注文処理（トランザクション）
export const orderProduct = (productsInCart: any[], amount: number) => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid;
    const userRef = firestore.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products: any = [];
    let soldOutProducts: any = [];
    // batchインスタンス作成
    const batch = firestore.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const data = snapshot.data();
      const sizes = data ? data.sizes : [];

      const updatedSizes = sizes.map((size: any) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });
      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });

      batch.delete(userRef.collection("cart").doc(product.cartId));
    }
    if (soldOutProducts.length > 0) {
      const errorMessage = soldOutProducts.length > 1 ? soldOutProducts.join("と") : soldOutProducts[0];
      alert("大変申し訳ありません。" + errorMessage + "が在庫切れとなったため注文処理を中断しました。");
      return false;
    } else {
      // コミット, 書き込み処理が１回で済む & 失敗したらロールバック
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

          const history = {
            amount: amount,
            created_at: timestamp,
            updated_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
          };
          orderRef.set(history);
          dispatch(push("/order/complate"));
        })
        .catch(() => {
          alert("注文処理に失敗しました。もう一度お試しください。");
          return false;
        });
    }
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
