import React from "react";
import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  label: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.palette.grey["300"],
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
    },
  })
);

const GreyButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};

export default GreyButton;
