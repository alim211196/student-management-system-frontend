import React, { memo } from "react";
import { TextField, Typography } from "@mui/material";
import CustomTheme from "./CustomTheme";
import { handleChange } from "./HandleChange";
import { DarkFFF } from "./CommonCookies";
import { useCookies } from "react-cookie";
const CustomTextField = ({
  label,
  name,
  value,
  type,
  disabled,
  setFormData,
  admin,
}) => {
  const [cookies] = useCookies(["theme"]);
    const path = ["/login", "/forgot-password", "/reset-password"].includes(
      window.location.pathname
    );
  const styleForTextFiled = () => {
    if (name === "course" && admin === false) {
      return {
        "& .MuiOutlinedInput-input": {
          textTransform: "uppercase",
        },
      };
    }
    else if (name === "course" && admin === true) {
       return {
         "& .MuiOutlinedInput-input": {
           textTransform: "capitalize",
         },
       };
     }
      else if (name === "courseYear") {
       return {
         "& .MuiOutlinedInput-input": {
           textTransform: "capitalize",
         },
       };
     } else {
       return {
         "& .MuiOutlinedInput-input": {
           textTransform: "inherit",
         },
       };
     }
  };
  return (
    <CustomTheme>
      <Typography
        sx={{
          color:path ? "#FFF": DarkFFF(cookies),
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {label} <span style={{ color: "red", marginLeft: 5 }}>*</span>
      </Typography>
      <TextField
        margin="dense"
        required
        fullWidth
        placeholder={
          name === "course" && admin === true
            ? `Enter ${label} exp:ABC`
            : `Enter ${label}`
        }
        id="outlined-basic"
        variant="outlined"
        size="small"
        name={name}
        value={value}
        onChange={(e) => handleChange(e, setFormData)}
        type={type}
        disabled={disabled}
        sx={styleForTextFiled()}
      />
    </CustomTheme>
  );
};

export default memo(CustomTextField);
