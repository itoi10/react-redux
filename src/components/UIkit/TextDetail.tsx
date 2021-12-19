import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      flexFlow: "row wrap",
      marginBottom: 16,
    },
    label: {
      marginLeft: 0,
      marginRight: "auto",
    },
    value: {
      fontWeight: 600,
      marginLeft: "auto",
      marginRight: 0,
    },
  })
);

interface Props {
  label: string;
  value: string;
}

const TextDetail: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.label}>{props.label}</div>
      <div className={classes.value}>{props.value}</div>
    </div>
  );
};

export default TextDetail;
