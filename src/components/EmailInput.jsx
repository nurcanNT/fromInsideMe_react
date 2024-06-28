import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

const EmailInput = forwardRef((props, ref) => {
  return (
    <TextField
      sx={{ width: "100%" }}
      type="email"
      id="email"
      name="email"
      inputRef={ref}
      {...props}
    />
  );
});
export default EmailInput;
