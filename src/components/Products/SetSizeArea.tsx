import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

interface Props {}

const useStyle = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SetSizeArea: React.FC<Props> = (props) => {
  const classes = useStyle();

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
        </Table>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
