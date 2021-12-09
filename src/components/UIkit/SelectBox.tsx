import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  label: string;
  required: boolean;
  value: string;
  select: (param: string) => void;
  options: { id: string; name: string }[];
}

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

const SelectBox: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select required={props.required} value={props.value} onChange={(e) => props.select(e.target.value as string)}>
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
