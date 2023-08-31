import React, { memo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTheme from "../../../Utils/CustomTheme";
import { IconColor } from "../../../Utils/stylingMethods";
const CustomListItem = ({ item, open, styles, cookies }) => {
  const navigate = useNavigate();
  const selected = item.path === window.location.pathname;

  return (
    <CustomTheme>
      <ListItemButton
        sx={{ borderRadius: open && "10px", ...styles.listItemBtn }}
        onClick={() => navigate(item.path)}
        selected={selected}
      >
        <Tooltip title={!open && item.title} placement="right">
          <ListItemIcon
            sx={{ color: IconColor(cookies, selected), ...styles.innerAvatar }}
          >
            {item.icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={item.title}
          sx={{
            color: IconColor(cookies, selected),
            ...styles.listItemText,
          }}
        />
      </ListItemButton>
    </CustomTheme>
  );
};

export default memo(CustomListItem);
