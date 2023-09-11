import React, { memo, useState, useEffect, useCallback } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTheme from "../../../Utils/CustomTheme";
import { IconColor } from "../../../Utils/stylingMethods";

const CustomListItem = ({ item, open, styles, cookies }) => {
  const navigate = useNavigate();
  const selected = item.path === window.location.pathname;

  const [openTooltip, setOpenTooltip] = useState(false);

  const handleClick = useCallback(() => {
    navigate(item.path);
  }, [navigate, item.path]);

  useEffect(() => {
    if (openTooltip === true) {
      handleClick();
    }
  }, [openTooltip, handleClick]);

  return (
    <CustomTheme>
      <ListItemButton
        sx={{ borderRadius: open && "10px", ...styles.listItemBtn }}
        onClick={() => {
          setOpenTooltip(true);
        }}
        selected={selected}
      >
        <Tooltip title={!openTooltip && !open && item.title} placement="right">
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
