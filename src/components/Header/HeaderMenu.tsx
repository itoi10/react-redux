import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Menu, ShoppingCart, FavoriteBorder } from "@material-ui/icons";
import { getProducts } from "../../reducks/products/selectors";
import { getUserId, getProductsInCart } from "../../reducks/users/selectors";
import { firestore } from "../../firebase";
import { fetchProductsInCart } from "../../reducks/users/operations";

interface Props {
  handleDrawerToggle: any;
}

const HeaderMenus: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const uid = getUserId(selector);
  let ProductsInCart: any[] = getProductsInCart(selector);

  useEffect(() => {
    // カート内商品 追加、変更、削除
    const unsubscribe = firestore
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              ProductsInCart.push(product);
              break;
            case "modified":
              const index = ProductsInCart.findIndex((product) => product.cartId === change.doc.id);
              ProductsInCart[index] = product;
              break;
            case "removed":
              ProductsInCart = ProductsInCart.filter((product) => product.cartId !== change.doc.id);
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInCart(ProductsInCart));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={ProductsInCart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
