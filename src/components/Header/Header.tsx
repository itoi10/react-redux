import React, { useState, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import logo from "../../assets/img/src/logo.png";
import { HeaderMenus, ClosableDrawer } from "./index";

// TSでのmakeStyles書き方
// https://zenn.dev/osd/articles/520ee40dda0402
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#fff",
      color: "#444",
    },
    toolBar: {
      margin: "0 auto",
      maxWidth: 1024,
      width: "100%",
    },
    iconButton: {
      margin: "0 0 0 auto",
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
  const isSignedIn = getIsSignedIn(selector);
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (e: any) => {
      // Tab,Shiftが押されても閉じないようにする
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt={"ヘッダーロゴ"} width={"128px"} onClick={() => dispatch(push("/"))} />
          {isSignedIn && (
            <div className={classes.iconButton}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
