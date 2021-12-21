import React from "react";
import { Divider } from "@material-ui/core";
import { TextDetail } from "../UIkit";
import { OrderedProducts } from ".";

interface Props {
  order: {
    id: string;
    amount: string;
    updated_at: any;
    shipping_date: any;
    products: any[];
  };
}

const datetimeToString = (date: Date) => {
  const yyyy = date.getFullYear();
  const MM = ("00" + (date.getMonth() + 1)).toString().slice(-2);
  const dd = ("00" + date.getDate()).toString().slice(-2);
  const HH = ("00" + date.getHours()).toString().slice(-2);
  const mm = ("00" + date.getMinutes()).toString().slice(-2);
  const ss = ("00" + date.getSeconds()).toString().slice(-2);
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
};

const dateToString = (date: Date) => {
  const yyyy = date.getFullYear();
  const MM = "00" + (date.getMonth() + 1).toString().slice(-2);
  const dd = "00" + date.getDate().toString().slice(-2);
  return `${yyyy}-${MM}-${dd}`;
};

const OrderHistoryItem: React.FC<Props> = (props) => {
  const order = props.order;
  const price = "¥" + order.amount.toLocaleString();
  const orderedDatetime = datetimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());

  console.log("tt" + order.products);

  return (
    <div>
      <div className="h-4" />
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={orderedDatetime} />
      <TextDetail label={"発送予定日"} value={shippingDate} />
      <TextDetail label={"注文金額"} value={price} />
      {order.products.length > 0 && <OrderedProducts products={order.products} />}
      <div className="h-2" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
