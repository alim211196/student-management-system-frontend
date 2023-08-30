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
import { DarkFF4F } from "./CommonCookies";
const BeforeLoginMenuBody = ({ open, toggleDrawer, cookies }) => {
  const navigate = useNavigate();

  return (
    <MenuWrapper open={open} toggleDrawer={toggleDrawer} cookies={cookies}>
      <List>
        {navLinks
          .filter(
            (nav) =>
              nav?.path !== window.location.pathname && nav.LoggedIn === false
          )
          .map((item, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => navigate(item.path)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: DarkFF4F(cookies) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: DarkFF4F(cookies),
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
