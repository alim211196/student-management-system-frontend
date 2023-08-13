import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Dark00FF, IconColor } from "../../../Utils/CommonCookies";
const CourseCard = ({ item, cookies, handleEdit, handleActive }) => {
  const cookieCondition = () => {
    if (cookies.theme === "dark") {
      return {
        background: Dark00FF(cookies),
        color: "#fff",
        border: `1px solid ${IconColor(cookies)}`,
        transition: "transform 500ms ease",
        "&:hover": {
          transform: `scale(1.05)`,
        },
      };
    } else {
      return {
        border: `1px solid ${IconColor(cookies)}`,
        transition: "transform 500ms ease",
        "&:hover": {
          transform: `scale(1.05)`,
        },
      };
    }
  };

  const getYear = () => {
    switch (item?.years?.length) {
      case 1:
        return "One year course";
      case 2:
        return "Two years course";
      case 3:
        return "Three years course";
      case 4:
        return "Four years course";
      case 5:
        return "Five years course";
      default:
        return "";
    }
  };

  return (
    <Card elevation={0} sx={cookieCondition()}>
      <CardActionArea>
        <CardContent sx={{ p: 0 }}>
          <ListItem>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {item?.course?.name}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{
                    fontSize: "13px",
                  }}
                >
                  {getYear()}
                </Typography>
              }
            />
          </ListItem>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            pl: 2,
            pr: 2,
            pt: 0,
            pb: 1,
          }}
        >
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleEdit(item._id)}>
              <EditIcon sx={{ fontSize: 20, color: IconColor(cookies) }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={item.active === false ? "Inactive" : "Active"}
            placement="top"
          >
            <IconButton
              onClick={() => {
                item.active === false
                  ? handleActive(true, item._id)
                  : handleActive(false, item._id);
              }}
            >
              {item.active === false ? (
                <CancelIcon sx={{ fontSize: 20, color: "#EF5350" }} />
              ) : (
                <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
              )}
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
