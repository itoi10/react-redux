import React from "react";
import { Route, Switch } from "react-router";
import { SignUp, Login, Home } from "./templates";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path="(/)?" component={Home} />
    </Switch>
  );
};

export default Router;
