import React from "react";
import { IconButton } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Menu, ShoppingCart, FavoriteBorder } from "@material-ui/icons";

interface Props {
  handleDrawerToggle: any;
}

const HeaderMenus: React.FC<Props> = (props) => {
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
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <Menu />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
