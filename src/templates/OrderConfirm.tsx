import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { List, Divider } from "@material-ui/core";
import { PrimaryButton, TextDetail } from "../components/UIkit";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailBox: {
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: 320,
      },
      [theme.breakpoints.up("sm")]: {
        width: 512,
      },
    },
    orderBox: {
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: 4,
      boxShadow: "0 4px 2px 2px rgba(0, 0, 0, 0.2)",
      height: 256,
      margin: "24px auto 16px auto",
      padding: 16,
      width: 288,
    },
  })
);

const OrderConfirm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const productsInCart = getProductsInCart(selector) as any[];

  // 商品額合計. 第２引数の値が変わった時だけ再計算する
  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);
  // 送料. 10000円以上で無料
  const shippingFee = subtotal >= 10000 ? 0 : 210;
  // 消費税額
  const taxRate = 0.1;
  const tax = (subtotal + shippingFee) * taxRate;
  // 合計金額
  const total = subtotal + shippingFee + tax;

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      <h2 className="text-black text-2xl text-center mx-auto mb-4">注文の確認</h2>
      <div className="flex flex-row flex-wrap">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 && productsInCart.map((product) => <CartListItem product={product} />)}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()} />
          <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()} />
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()} />
          <Divider />
          <TextDetail label={"合計（税込）"} value={"¥" + total} />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
