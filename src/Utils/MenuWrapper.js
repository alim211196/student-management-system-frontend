import { Box, Drawer } from "@mui/material";
import React, { memo } from "react";
import { Dark00 } from "./CommonCookies";
const MenuWrapper = ({ open, toggleDrawer, children, cookies }) => {
    const token = cookies?.token && cookies?.token !== "undefined";
  return (
    <Drawer
      anchor={token ? "left" : "right"}
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        style: {
          zIndex: 1500,
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          background: Dark00(cookies),
          height: "100vh",
        }}
        role="presentation"
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default memo(MenuWrapper);
