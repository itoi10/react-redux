import React from "react";
import { Route, Switch } from "react-router";
import {
  SignUp,
  SignIn,
  ResetPassword,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
} from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={ResetPassword} />

      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />

        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
      </Auth>
    </Switch>
  );
};

export default Router;
