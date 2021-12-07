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
const TextInput: React.FC<Props> = ({
  fullWidth,
  label,
  multiline,
  required,
  rows,
  value,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextInput;
