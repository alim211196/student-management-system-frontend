import React, { memo, useEffect, useState } from "react";
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
import { useCookies } from "react-cookie";
import ModeComp from "./ModeComp";
const BeforeLoginMenuBody = ({ isOpen }) => {
  const [cookies] = useCookies(["theme"]);
  const navigate = useNavigate();
 const [menuHeight, setMenuHeight] = useState("0%");

 useEffect(() => {
   setMenuHeight(isOpen ? "100%" : "0%");
 }, [isOpen]);

 const menuStyle = {
   height: menuHeight,
   background: cookies.theme === "dark" ? "#000" : "#0063A5",
   zIndex: 1000,
   overflow: "hidden",
 };

 const ListBtnHover ={
  "&.MuiListItemButton-root:hover": {
    backgroundColor: '#292929',
    opacity:0.8
}
 }

  return (
    <Box
      sx={{
        position: "initial",
        top: 56,
        left: 0,
        width: "100%",
        transition: "height 0.5s ease-in-out",
        ...menuStyle,
      }}
    >
      <List>
        {navLinks
          .filter(
            (nav) =>
              nav.path !== window.location.pathname && nav.LoggedIn === false
          )
          .map((item, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => navigate(item.path)}
                disablePadding
              >
                <ListItemButton sx={ListBtnHover}>
                  <ListItemIcon
                    sx={{
                      color: "#FFF",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: "#FFF",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default memo(BeforeLoginMenuBody);
