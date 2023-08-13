import React, { memo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTheme from "../../../Utils/CustomTheme";
const CustomListItem = ({ item, open, styles }) => {
  const navigate = useNavigate();
  return (
    <CustomTheme>
      <ListItemButton
        sx={styles.listItemBtn}
        onClick={() => navigate(item.path)}
        selected={item.path===window.location.pathname}
      >
        <Tooltip title={!open && item.title} placement="right">
          <ListItemIcon sx={styles.innerAvatar}>
          {item.icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={item.title} sx={styles.listItemText} />
      </ListItemButton>
    </CustomTheme>
  );
};

export default memo(CustomListItem);
