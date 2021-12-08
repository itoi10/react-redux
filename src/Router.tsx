import React from "react";
import { Route, Switch } from "react-router";
import { SignUp, SignIn, Home, ResetPassword, ProductEdit } from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={ResetPassword} />

      <Auth>
        <Route exact path="(/)?" component={Home} />
        <Route exact path="/product/edit" component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
