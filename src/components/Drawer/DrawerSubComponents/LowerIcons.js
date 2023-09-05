import {
  ListItem,
  ListItemButton,
  Tooltip,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { memo } from "react";
import CustomTheme from "../../../Utils/CustomTheme";
const LowerIcons = ({ icon, text, open, setDialogOpen, styles, cookies }) => {
  const IconColor = () => {
    if (cookies.theme === "dark") {
      return "#FFF";
    } 
  };
  return (
    <CustomTheme>
      <ListItem disablePadding sx={styles.dynamicListItem}>
        <ListItemButton
          sx={styles.listItemBtn}
          onClick={() => setDialogOpen(true)}
        >
          <Tooltip title={!open && text} placement="right">
            <ListItemIcon sx={{ color: IconColor(), ...styles.innerAvatar }}>
              {icon}
            </ListItemIcon>
          </Tooltip>

          <ListItemText
            primary={text}
            sx={{
              color: IconColor(),
              ...styles.listItemText,
            }}
          />
        </ListItemButton>
      </ListItem>
    </CustomTheme>
  );
};

export default memo(LowerIcons);
