import { LoadingButton } from "@mui/lab";
import React, { memo } from "react";

const CustomButton = ({ text, loading }) => {
 const commonStyle = {
   color: "#fff",
   borderColor: "#fff",
   background: "#00A7DC",
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
          ...commonStyle,
        },
        "&:disabled": {
          ...commonStyle,
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
