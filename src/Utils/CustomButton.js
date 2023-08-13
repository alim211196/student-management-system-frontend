import { LoadingButton } from "@mui/lab";
import React, { memo } from "react";
import { gradientBackground } from "./stylingMethods";

const CustomButton = ({ text, loading }) => {
  return (
    <LoadingButton
      type="submit"
      variant={"contained"}
      sx={{
        mt: 1,
        width: "100%",
        textTransform: "capitalize",
        minHeight: 38,
        background: gradientBackground("#ED6A5E"),
        color: "#fff",
        borderColor: "#fff",
        ":hover": {
          color: "#fff",
          borderColor: "#fff",
          background: gradientBackground("#ED6A5E"),
        },
      }}
      disabled={loading}
      loading={loading}
    >
      {loading ? null : <span>{text}</span>}
    </LoadingButton>
  );
};

export default memo(CustomButton);
