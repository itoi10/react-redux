import React from "react";
import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Menu, ShoppingCart, FavoriteBorder } from "@material-ui/icons";

const HeaderMenus: React.FC = () => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
