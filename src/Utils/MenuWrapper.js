import { Box, Drawer } from "@mui/material";
import React, { memo } from "react";
import { Dark00 } from "./CommonCookies";
const MenuWrapper = ({ open, toggleDrawer, children, cookies }) => {
  return (
    <Drawer
      anchor={cookies?.token !== "undefined" ? "left" : "right"}
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
          width: 240,
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
