import { LoadingButton } from "@mui/lab";
import React, { memo } from "react";

const CustomButton = ({ text, loading }) => {
 const commonStyle = {
    color: "#fff",
    borderColor: "#fff",
    background: "#F5AB40",
  };
  return (
    <LoadingButton
      type="submit"
      variant={"contained"}
      sx={{
        mt: 1,
        width: "100%",
        textTransform: "capitalize",
        minHeight: 38,
        ...commonStyle,
        "&:hover": {
          background: "transparent",
          border: "1px solid #F5AB40",
          color: "#F5AB40 !important",
        },
        "&:disabled": {
          background: "transparent",
          border: "1px solid #F5AB40",
          color: "#F5AB40 !important",
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
