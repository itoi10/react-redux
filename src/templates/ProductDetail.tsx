import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase";
import { makeStyles } from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper } from "../components/Products";

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

const ProductDetail: React.FC = () => {
  const classes = useStyles();
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

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      {product && (
        <div className="flex flex-row flex-wrap">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="text-black text-2xl text-center mx-auto mb-4">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="h-5" />
            <div className="h-5" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
