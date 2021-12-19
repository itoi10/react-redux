import React from "react";
import { TableContainer, Table, TableHead, TableCell, TableRow, IconButton, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FavoriteBorder, ShoppingCart } from "@material-ui/icons";

interface Props {
  sizes: { quantity: string; size: string }[];
  addProduct: (size: string) => void;
}

const useStyle = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable: React.FC<Props> = (props) => {
  const classes = useStyle();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {props.sizes.length > 0 ? (
            props.sizes.map((size) => (
              <TableRow key={size.size}>
                {/* サイズ */}
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                {/* 残数 */}
                <TableCell>残り{size.quantity}点</TableCell>
                {/* 注文ボタン */}
                <TableCell className={classes.iconCell}>
                  {parseInt(size.quantity) > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCart />
                    </IconButton>
                  ) : (
                    <div>売切</div>
                  )}
                </TableCell>
                {/* お気に入りボタン */}
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <div>在庫なし</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
