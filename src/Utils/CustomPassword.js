import React, { memo } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { handleChange } from "./HandleChange";
import CustomTheme from "./CustomTheme";
import { DarkFFF, DarkFF4F } from "./CommonCookies";
import { Typography } from "@mui/material";
const CustomPassword = ({
  label,
  name,
  value,
  setFormData,
  cookies,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const path = ["/login", "/forgot-password", "/reset-password"].includes(
      window.location.pathname
    );
  return (
    <CustomTheme>
      <Typography
        sx={{
          color: path ? "#FFF !important" : DarkFF4F(cookies),
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {label} <span style={{ color: "red", marginLeft: 5 }}>*</span>
      </Typography>
      <FormControl
        variant="outlined"
        margin="dense"
        size="small"
        fullWidth
        required
      >
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(e) => handleChange(e, setFormData)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{ color: path ? "#FFF !important" : DarkFFF(cookies) }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </CustomTheme>
  );
};

export default memo(CustomPassword);
