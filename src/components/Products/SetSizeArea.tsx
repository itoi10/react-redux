import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, IconButton, TableBody } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useCallback, useMemo } from "react";
import { TextInput } from "../UIkit";

interface Props {
  sizes: { quantity: string; size: string }[];
  setSizes: (sizes: any) => void;
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
  const [quantity, setQuantity] = useState("0");

  const inputSize = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSize(e.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(e.target.value);
    },
    [setQuantity]
  );

  const addSize = (index: number, size: string, quantity: string) => {
    // 入力チェック
    if (size === "" || quantity == "") {
      return false;
    }
    // 新規追加
    if (index === props.sizes.length) {
      props.setSizes((prev: any) => [...prev, { size: size, quantity: quantity }]);
      // 編集
    } else {
      const newSizes = props.sizes;
      newSizes[index] = { size: size, quantity: quantity };
      props.setSizes(newSizes);
    }
    // 入力欄初期化
    setIndex(index + 1);
    setSize("");
    setQuantity("0");
  };

  const editSize = (index: number, size: string, quantity: string) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex: number) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  const memoIndex = useMemo(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  {/* サイズ */}
                  <TableCell>{item.size}</TableCell>
                  {/* 数量 */}
                  <TableCell>{item.quantity}</TableCell>
                  {/* 編集アイコン */}
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  {/* 削除アイコン */}
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
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
            value={quantity}
            type={"number"}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
