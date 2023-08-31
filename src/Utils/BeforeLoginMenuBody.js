import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { navLinks } from "./navLinks";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ModeComp from "./ModeComp";
import MenuWrapper from "./MenuWrapper";
import { IconColor } from "./CommonCookies";
const BeforeLoginMenuBody = ({ open, toggleDrawer, cookies }) => {
  const navigate = useNavigate();

  return (
    <MenuWrapper open={open} toggleDrawer={toggleDrawer} cookies={cookies}>
      <List sx={{ p: 1 }}>
        {navLinks
          .filter((nav) => nav.LoggedIn === false)
          .map((item, index) => {
            const selected = item.path === window.location.pathname;
            return (
              <ListItem
                key={index}
                onClick={() => navigate(item.path)}
                disablePadding
              >
                <ListItemButton
                  selected={selected}
                  sx={{
                    borderRadius: "10px",
                    ":hover": {
                      background: cookies.theme === "dark" && "#292929",
                    },
                    "&.Mui-selected": {
                      background: "#0063a530",
                      ":hover": {
                        background: "#0063a530",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: IconColor(cookies, selected) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: IconColor(cookies, selected),
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          p: 1,
        }}
      >
        <ModeComp />
      </Box>
    </MenuWrapper>
  );
};

export default memo(BeforeLoginMenuBody);
