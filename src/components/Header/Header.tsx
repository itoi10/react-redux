import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";

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
  const selector = useSelector((state: any) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          Headerテスト
          {[isSignedIn ? <p>ログイン中です</p> : <p>ログアウト中です</p>]}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
