import React, { memo } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Dark00FF } from "./CommonCookies";
import { useCookies } from "react-cookie";
import ExcelExport from "./ExcelExport";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const TitleBox = ({ icon, text, data, fileName, id }) => {
  const { userData } = useSelector((state) => state.getUserProfile);
  const [cookies] = useCookies(["theme"]);
  const isAdmin = userData.role === "Admin";
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const attendance_id = localStorage.getItem("attendance_id");
  const ExportBtnCondition = () => {
    if (
      isAdmin &&
      ![
        "/manage-teachers",
        "/manage-students",
        "/dashboard",
        "/manage-profile",
        `/manage-teachers/${id}`,
        `/manage-students/${id}`,
        `/manage-students-account/${id}`,
        `/manage-students-attendance/${id}`,
        `/view-student-attendance/${id}`,
      ].includes(window.location.pathname)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const BackBtn = () => {
    if (
      [
        `/manage-students/${id}`,
        `/manage-teachers/${id}`,
        `/manage-students-attendance/${id}`,
        `/view-student-attendance/${id}`,
        `/manage-students-account/${id}`,
      ].includes(window.location.pathname)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const BackFunction = () => {
    if (window.location.pathname === `/manage-students-attendance/${id}`) {
      navigate("/manage-students-attendance");
      localStorage.removeItem("attendance_id");
    } else if (window.location.pathname === `/manage-teachers/${id}`) {
      navigate("/manage-teachers");
    } else if (window.location.pathname === `/manage-students/${id}`) {
      navigate("/manage-students");
    } else if (window.location.pathname === `/manage-students-account/${id}`) {
      navigate("/manage-students-account");
    } else {
      navigate(`/manage-students-attendance/${attendance_id}`);
      localStorage.removeItem("attendance_id");
    }
  };

  const gridCondition = () => {
    if (
      [
        "/manage-departments",
        "/manage-students-account",
        "/manage-queries",
        `/manage-students-account/${id}`,
        `/manage-students/${id}`,
        `/manage-teachers/${id}`,
        "/manage-students-attendance",
        `/manage-students-attendance/${id}`,
        `/view-student-attendance/${id}`,
      ].includes(window.location.pathname)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: "10px",
        mb: 2,
        mt: 1,
        background: Dark00FF(cookies),
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={gridCondition() ? 10 : 12}
          sm={gridCondition() ? 10 : 6}
          md={gridCondition() ? 10 : 6}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
            <Typography
              sx={{
                color: cookies.theme === "dark" ? "#fff" : "#2C497F",
                fontSize: matches ? "20px" : "18px",
                ml: 1,
              }}
            >
              {text}
            </Typography>
          </Box>
        </Grid>
        {BackBtn() && (
          <Grid
            item
            xs={gridCondition() ? 2 : 12}
            sm={gridCondition() ? 2 : 6}
            md={gridCondition() ? 2 : 6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {matches ? (
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => BackFunction()}
              >
                Back
              </Button>
            ) : (
              <Tooltip title={"Back"} placement="top">
                <IconButton
                  color="primary"
                  aria-label="Back"
                  onClick={() => BackFunction()}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        )}
        {ExportBtnCondition() && (
          <Grid
            item
            xs={gridCondition() ? 2 : 12}
            sm={gridCondition() ? 2 : 6}
            md={gridCondition() ? 2 : 6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box>
              <ExcelExport
                userData={userData}
                data={data}
                fileName={fileName}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default memo(TitleBox);
