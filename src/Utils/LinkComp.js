import { Link } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const LinkComp = ({ path, text }) => {
  const navigate = useNavigate();
  return (
    <Link
      sx={{
        color:"#FFF",
      }}
      component="button"
      variant="body2"
      onClick={() => navigate(path)}
    >
      {text}
    </Link>
  );
};

export default memo(LinkComp);
