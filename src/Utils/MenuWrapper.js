import { Box, Drawer, IconButton } from "@mui/material";
import React, { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Dark00, DarkFF4F } from "./CommonCookies";
const MenuWrapper = ({ open, toggleDrawer, children, cookies }) => {

  const DrawerStyling = ()=>{
    if (
      ["/", "/login", "/forgot-password", "/reset-password"].includes(
        window.location.pathname
      )
    ) {
      return {
        "& .MuiPaper-root": {
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          background: Dark00(cookies),
        },
      };
    } else {
      return {
        "& .MuiPaper-root": {
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          background: Dark00(cookies),
        },
      };
    }
  }

  return (
    <Drawer
      anchor={cookies.loggedIn === "true" ? "left" : "right"}
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        style: {
          zIndex: 1500,
        },
      }}
      sx={DrawerStyling()}
    >
      <Box
        sx={{
          width: 240,
          background: Dark00(cookies),
          height: "100vh",
        }}
        role="presentation"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent:
              cookies.loggedIn === "true" ? "flex-end" : "flex-start",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{ color: DarkFF4F(cookies) }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default memo(MenuWrapper);
