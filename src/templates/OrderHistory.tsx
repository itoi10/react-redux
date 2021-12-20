import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

  return (
    <section className="my-0 mx-auto max-w-xl relative py-0 px-4 text-center w-full">
      <List className={classes.orderList}>注文履歴テスト</List>
    </section>
  );
};

export default OrderHistory;
