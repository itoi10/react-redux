import React from "react";
import { makeStyles, createStyles, Theme, Divider, IconButton } from "@material-ui/core";
import { ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { firestore } from "../../firebase";

interface Props {
  product: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      height: 128,
    },
    image: {
      objectFit: "cover",
      margin: 16,
      height: 96,
      width: 96,
    },
    text: {
      width: "100%",
    },
  })
);

const CartListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: any) => state);
  const uid = getUserId(selector);

  const image = props.product.images[0].path;
  const price = props.product.price.toLocaleString();
  const name = props.product.name;
  const size = props.product.size;

  const removeProductFromCart = (id: string) => {
    return firestore.collection("users").doc(uid).collection("cart").doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={"サイズ:" + size} />
          <ListItemText primary={"¥" + price} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <Delete />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
