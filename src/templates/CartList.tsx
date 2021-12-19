import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GreyButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: 512,
      width: "100%",
    },
  })
);

const CartList: React.FC = () => {
  const classes = useStyles();
  const selector = useSelector((state: any) => state);
  const productsInCart = getProductsInCart(selector) as any[];
  const dispatch = useDispatch();

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="mx-0 my-auto relative py-0 px-4 text-center w-full max-w-xl lg:max-w-5xl">
      <h2 className="text-black text-2xl text-center mx-auto mb-4">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => <CartListItem key={product.cartId} product={product} />)}
      </List>
      <div className="h-5" />
      <div className="flex flex-col items-center">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <div className="h-3" />
        <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
