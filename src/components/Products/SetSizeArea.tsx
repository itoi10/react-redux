import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, IconButton, TableBody } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useCallback } from "react";
import { TextInput } from "../UIkit";

interface Props {
  sizes: Array<any>;
}

const useStyle = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
  checkIcon: {
    float: "right",
  },
});

const SetSizeArea: React.FC<Props> = (props) => {
  const classes = useStyle();

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSize(e.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(parseInt(e.target.value));
    },
    [setQuantity]
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
              <TableBody>
                {props.sizes.length > 0 &&
                  props.sizes.map((item, index) => (
                    <TableRow key={item.size}>
                      {/* サイズ */}
                      <TableCell>{item.size}</TableCell>
                      {/* 数量 */}
                      <TableCell>{item.quantity}</TableCell>
                      {/* 編集アイコン */}
                      <TableCell>
                        <IconButton className={classes.iconCell}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      {/* 削除アイコン */}
                      <TableCell>
                        <IconButton className={classes.iconCell}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </TableRow>
          </TableHead>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={"サイズ"}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={"text"}
          />
          <TextInput
            fullWidth={false}
            label={"数量"}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity.toString()}
            type={"number"}
          />
        </div>
        <IconButton className={classes.checkIcon}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
