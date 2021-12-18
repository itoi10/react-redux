import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import logo from "../../assets/img/src/logo.png";
import { HeaderMenus } from "./index";

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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt={"ヘッダーロゴ"} width={"128px"} onClick={() => dispatch(push("/"))} />
          {isSignedIn && (
            <div className={classes.iconButton}>
              <HeaderMenus />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
