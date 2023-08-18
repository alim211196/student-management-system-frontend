import React, { memo } from "react";
import { Avatar, Box, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Dark00FF, DarkFF4F } from "../../../Utils/CommonCookies";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
const CommonUI = ({ value, cookies, title }) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: DarkFF4F(cookies),
        textTransform: "capitalize",
      }}
      xs={12}
      sm={6}
      md={2}
    >
      <Tooltip title={title} placement="top">
        <Box sx={{ cursor: "default" }}> {value}</Box>
      </Tooltip>
    </Grid>
  );
};

const CardSection = ({ item, cookies, handleActive }) => {
  const dispatch = useDispatch();
  const topColor = item.active ? "#4CAF50" : "#EF5350";
  const buttonStyles = {
    borderRadius: "50%",
    background:"#000",
    color: "white",
    width: "40px",
    height: "40px",
    transition: "all 0.3s ease",
  };
  const navigate = useNavigate();

  const handleView = (status) => {
    if (status === true) {
      navigate(`/manage-students-attendance/${item._id}`);
    } else {
      dispatch(
        openSnackbar({
          message: "Please activate attendance first.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: Dark00FF(cookies),
        border: `1px solid ${topColor}`,
        mt: 2,
        mb: 2,
        p: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CommonUI
          value={<Avatar src={item?.teacherProfile} sx={buttonStyles} />}
          cookies={cookies}
          title={null}
        />
        <CommonUI
          value={item?.teacherName}
          cookies={cookies}
          title={"Taken by"}
        />
        <CommonUI value={item?.course} cookies={cookies} title={"Course"} />
        <CommonUI value={item?.courseYear} cookies={cookies} title={"Batch"} />
        <CommonUI
          value={moment(item?.date).format("LL")}
          cookies={cookies}
          title={"Attendance date"}
        />
        <CommonUI
          value={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                flexDirection: "row",
              }}
            >
              <Tooltip title={"View Attendance"} placement="top">
                <IconButton onClick={() => handleView(item.active)}>
                  <ContentPasteGoIcon sx={{ fontSize: 20 }} />
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
                  {" "}
                  {item.active === false ? (
                    <CancelIcon sx={{ fontSize: 20, color: "#EF5350" }} />
                  ) : (
                    <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          }
          cookies={cookies}
          title={null}
        />
      </Grid>
    </Paper>
  );
};

export default memo(CardSection);
