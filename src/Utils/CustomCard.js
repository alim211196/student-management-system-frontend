import React, { memo } from "react";
import {
  CardActionArea,
  CardActions,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardName } from "./CardName";
import useMediaQuery from "@mui/material/useMediaQuery";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "./stylingMethods";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import {
  CardBorder,
  Dark00,
  Dark00FF,
  DarkFFF,
  IconColor,
} from "./CommonCookies";
import ReplyIcon from "@mui/icons-material/Reply";
const CustomCard = ({
  item,
  handleEdit,
  handleActive,
  parentComp,
  cookies,
  isAdmin,
  handleClickOpen,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const matches = useMediaQuery("(min-width:600px)");

  const hiddenStyle = {
    width: matches ? "100%" : "17rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: DarkFFF(cookies),
    textTransform: "capitalize",
    fontWeight: "bold",
  };
  const hiddenStyle1 = {
    width: matches ? "100%" : "17rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: DarkFFF(cookies),
    fontWeight: "bold",
  };
  // const randomIndex = Math.floor(Math.random() * colors.length);
  // const bgColor = colors[randomIndex];
  const cookieCondition = () => {
    if (cookies.theme === "dark") {
      return {
        background: Dark00FF(cookies),
        color: "#fff",
        border: CardBorder(cookies, "#2C497F"),
        transition: "transform 500ms ease",
        "&:hover": {
          transform: `scale(1.05)`,
        },
      };
    } else {
      return {
        transition: "transform 500ms ease",
        "&:hover": {
          transform: `scale(1.05)`,
        },
      };
    }
  };

  const ManageAtt = {
    Image: item?.teacherProfile,
    FullName: item?.teacherName,
    row1: `${item?.course} (${item?.courseYear})`,
    row2: item?.date,
  };

  const OtherComp = {
    Image: item?.profileImage,
    FullName: item?.fullName,
    row1: item?.email,
    row2: item?.phone,
  };

  const data = parentComp === "Manage Attendance" ? ManageAtt : OtherComp;

  const handleRedirect = () => {
    if (["View Records", "Manage Teachers"].includes(parentComp)) {
      return handleEdit(item._id);
    } else if (["Manage Attendance"].includes(parentComp)) {
      return handleEdit(item._id, item?.active);
    }
  };
  return (
    <Card elevation={0} sx={cookieCondition()}>
      <CardActionArea onClick={() => handleRedirect()}>
        <CardMedia
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            pt: 2,
          }}
        >
          <Avatar
            src={data.Image}
            sx={{
              background: Dark00(cookies),
              color: IconColor(cookies),
              width: 80,
              height: 80,
              fontSize: "40px",
              border: "1px solid #2C497F",
            }}
          >
            {CardName(`${data.FullName}`)}
          </Avatar>
        </CardMedia>
        <CardContent sx={{ pl: 2, pr: 2, pt: 0, pb: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={hiddenStyle}
          >
            {data.FullName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={hiddenStyle1}>
            {data.row1}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: DarkFFF(cookies),
              textTransform: "capitalize",
            }}
          >
            {data.row2}
          </Typography>
        </CardContent>
      </CardActionArea>
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
        {["View Records", "Manage Teachers"].includes(parentComp) && (
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleEdit(item._id)}>
              <EditIcon sx={{ fontSize: 20, color: IconColor(cookies) }} />
            </IconButton>
          </Tooltip>
        )}
        {parentComp === "Manage Attendance" && (
          <Tooltip title={"View Attendance"} placement="top">
            <IconButton onClick={() => handleEdit(item?._id, item?.active)}>
              <ContentPasteGoIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        )}
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
            {" "}
            {item.active === false ? (
              <CancelIcon sx={{ fontSize: 20, color: "#EF5350" }} />
            ) : (
              <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
            )}
          </IconButton>
        </Tooltip>
        {parentComp === "Manage Queries" && (
          <>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon sx={{ color: IconColor(cookies) }} />
            </ExpandMore>
            {isAdmin && (
              <Tooltip title={"Reply"} placement="top">
                <IconButton onClick={() => handleClickOpen(item._id)}>
                  <ReplyIcon sx={{ color: IconColor(cookies) }} />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </CardActions>
      {parentComp === "Manage Queries" && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comment:</Typography>
            <Typography paragraph>{item?.comment}</Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
};

export default memo(CustomCard);
