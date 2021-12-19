import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseTimestamp, firestore } from "../firebase";
import { makeStyles } from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper, SizeTable } from "../components/Products";
import { addProductToCart } from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

// 改行をbrタグに変換
const returnCodeToBr = (text: string) => {
  if (text === "") {
    return text;
  }
  return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
};

// 商品詳細ページ
const ProductDetail: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const path: string = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // 商品情報取得
    firestore
      .collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  const addProduct = useCallback(
    (selectedSize: string) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          price: product.price,
          productId: product.id,
          quantity: 1,
          size: selectedSize,
        })
      );
    },
    [product]
  );

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      {product && (
        <div className="flex flex-row flex-wrap">
          {/* 商品画像 */}
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          {/* 商品情報 */}
          <div className={classes.detail}>
            {/* 商品名 */}
            <h2 className="text-black text-2xl text-center mx-auto mb-4">{product.name}</h2>
            {/* 価格 */}
            <p className={classes.price}>￥{product.price.toLocaleString()}</p>
            <div className="h-5" />
            {/* サイズ一覧 */}
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <div className="h-5" />
            {/* 説明 */}
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
