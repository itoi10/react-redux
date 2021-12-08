import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  label: string;
  onClick: () => void;
}

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(#fffccd, #ffc400)",
    border: "1px solid #000",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const PrimaryButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
