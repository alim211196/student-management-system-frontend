import React, { memo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTheme from "../../../Utils/CustomTheme";
const CustomListItem = ({ item, open, styles, cookies }) => {
  const navigate = useNavigate();
  const selected = item.path === window.location.pathname;

  const IconColor = () => {
    if (cookies.theme === "dark") {
      if (selected) {
        return "#FFF";
      } else {
        return "#FFF";
      }
    } else {
      if (selected) {
        return "#FFF";
      } else {
        return "#0063A5";
      }
    }
  };
  return (
    <CustomTheme>
      <ListItemButton
        sx={styles.listItemBtn}
        onClick={() => navigate(item.path)}
        selected={selected}
      >
        <Tooltip title={!open && item.title} placement="right">
          <ListItemIcon sx={{ color: IconColor(), ...styles.innerAvatar }}>
            {item.icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={item.title}
          sx={{
            color: IconColor(),
            ...styles.listItemText,
          }}
        />
      </ListItemButton>
    </CustomTheme>
  );
};

export default memo(CustomListItem);
