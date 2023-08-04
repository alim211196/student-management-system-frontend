import { Button } from "@mui/material";
import React, { memo } from "react";

const CustomButton = ({ text, loading }) => {
  const variantChange = () => {
    if (
      [
        "/sign_in",
        "/forgot-password",
        "/reset-password",
        "/",
        "/admin/sign_in",
        "/manage-departments",
      ].includes(window.location.pathname)
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Button
      type="submit"
      variant={variantChange() ? "contained" : "text"}
      sx={{
        mt: variantChange() && 1,
        width: "100%",
        textTransform: "capitalize",
        background: variantChange() && "#1976D2",
        color: "#fff",
        borderColor: "#fff",
        ":hover": {
          color: "#fff",
          borderColor: "#fff",
        },
      }}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default memo(CustomButton);
