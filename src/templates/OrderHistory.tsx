import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getOrderHistory } from "../reducks/users/selectors";
import { fetchOrderHistory } from "../reducks/users/operations";
import { OrderHistoryItem } from "../components/Products";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderList: {
      background: theme.palette.grey["100"],
      margin: "0 auto",
      padding: 32,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: 768,
      },
    },
  })
);

const OrderHistory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const orders = getOrderHistory(selector);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, []);

  return (
    <section className="my-0 mx-auto max-w-xl relative py-0 px-4 text-center w-full">
      <List className={classes.orderList}>
        {orders.length > 0 && orders.map((order) => <OrderHistoryItem order={order} key={order.id} />)}
      </List>
    </section>
  );
};

export default OrderHistory;
