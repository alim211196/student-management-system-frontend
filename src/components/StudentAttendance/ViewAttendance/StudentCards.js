import React, {useState ,useEffect, memo } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { CardBorder, Dark00 } from "../../../Utils/CommonCookies";
import { AntSwitch } from "../../../Utils/stylingMethods";
import { UPDATE_ATTENDANCE } from "../../../ApiFunctions/attendance";
const StudentCards = ({
  _id,
  attendanceId,
  cookies,
  icon,
  name,
  present,
  getAttendance,
}) => {
  const topColor = present ? "#4CAF50" : "#EF5350",
    bottomColor = present ? "#1B5E20" : "#B71C1C";

  const [attendance, setAttendance] = useState(present);


useEffect(() => {
  if(present){
    setAttendance(true)
  }
  else{
    setAttendance(false)
  }
}, [present]);


  const handleAttendanceChange = (event) => {
    const newAttendance = event.target.checked;
    setAttendance(newAttendance);
    UPDATE_ATTENDANCE(_id, attendanceId, newAttendance, cookies?.token)
      .then((res) => {
        getAttendance();
      })
      .catch((err) => {});
  };
  return (
    <Card
      sx={{
        background: topColor,
        border: CardBorder(cookies, bottomColor),
      }}
      elevation={0}
    >
      <CardActionArea>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            flexDirection: "row",
            pt: 1,
            pr: 1,
          }}
        >
          <AntSwitch
            checked={attendance ? true : false}
            onChange={(event) => handleAttendanceChange(event)}
            inputProps={{ "aria-label": "ant design" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            padding: "0px 20px 20px 20px",
          }}
        >
          <Avatar
            src={icon}
            sx={{
              background: Dark00(cookies),
              width: 80,
              height: 80,
            }}
          />
        </Box>
        <CardContent sx={{ p: "10px", background: bottomColor }}>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#fff",
              textAlign: "center",
              minWidth: "12rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(StudentCards);
