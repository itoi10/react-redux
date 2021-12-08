import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

interface Props {
  label: string;
  required: boolean;
  value: string;
  select: (param: string) => void;
  options: { id: string; name: string }[];
}

const SelectBox: React.FC<Props> = (props) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(e) => props.select(e.currentTarget.value as string)}
      >
        {props.options.map((option) => {
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
