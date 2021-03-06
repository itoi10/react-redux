import React, { useState, useEffect, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { Search, AddCircle, History, Person, ExitToApp } from "@material-ui/icons";
import { TextInput } from "../UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { firestore } from "../../firebase";

interface Props {
  open: boolean;
  onClose: (e: {}) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: 256,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: "center",
      display: "flex",
      marginLeft: 32,
    },
  })
);

const ClosableDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { container }: any = props;
  const [keyword, setKeyword] = useState("");
  const inputKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event: React.MouseEvent, path: string) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const menus = [
    { func: selectMenu, label: "商品登録", icon: <AddCircle />, id: "register", path: "/product/edit" },
    { func: selectMenu, label: "注文履歴", icon: <History />, id: "history", path: "/order/history" },
    { func: selectMenu, label: "プロフィール", icon: <Person />, id: "profile", path: "/profile" },
  ];

  const [filters, setFilters] = useState([
    { func: selectMenu, label: "すべて", id: "all", path: "/" },
    { func: selectMenu, label: "メンズ", id: "male", path: "/?gender=male" },
    { func: selectMenu, label: "レディース", id: "female", path: "/?gender=female" },
  ]);

  useEffect(() => {
    firestore
      .collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const categoryList: any[] = [];
        snapshots.forEach((snapshot) => {
          const category = snapshot.data();
          categoryList.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            path: `/?category=${category.id}`,
          });
        });
        setFilters((prevState) => [...prevState, ...categoryList]);
      });
  }, []);

  return (
    <nav className={classes.drawer}>
      {/* Drawer, https://mui.com/components/drawers/ */}
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={"text"}
            />
            <IconButton>
              <Search />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.path)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary="カテゴリー" />
            </ListItem>
            {filters.map((filter) => (
              <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.path)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
