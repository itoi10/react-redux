import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  label: string,
  onClick: () => void
}

const useStyles = makeStyles({
  "button": {
    backgroundColor: "#4dd0e1",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256
  }
})

const PrimaryButton:React.FC<Props> = ({label, onClick}) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => onClick()}
    >
      {label}
    </Button>
  )
}

export default PrimaryButton