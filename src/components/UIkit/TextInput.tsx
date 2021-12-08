import React from "react";
import { TextField } from "@material-ui/core";

interface Props {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// 入力フォーム部品
const TextInput: React.FC<Props> = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
