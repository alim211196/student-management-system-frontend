import { Container, CssBaseline, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { useCookies } from "react-cookie";
import TitleBox from "../../Utils/TitleBox";
import {
  CalendarMonth,
  PostAdd,
  ContentPasteSearch,
} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../../Utils/TabPanel";
import AddAttendance from "./AddAttendance";
import { Dark00FF, DarkFFF } from "../../Utils/CommonCookies";
import { useDispatch, useSelector } from "react-redux";
import { GET_STUDENTS } from "../../ApiFunctions/students";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import GroupIcon from "@mui/icons-material/Group";
import ViewAttendance from "./ViewAttendance";
import { GET_ATTENDANCE } from "../../ApiFunctions/attendance";
import { ContainerStyle } from "../../Utils/stylingMethods";
const AttendanceIndex = () => {
  const [cookies, setCookie] = useCookies(["theme", "UserId"]);
  const { userData } = useSelector((state) => state.getUserProfile);
  const { allUsers } = useSelector((state) => state.getUsers);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [AttData, setAttData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const inputDate = new Date();
  const isoDate = inputDate.toISOString();
  const formattedDate = isoDate.slice(0, 10);
  const [status, setStatus] = useState(false);
  const isAdmin = userData?.role === "Admin";

  useEffect(() => {
    setLoading(true);
    GET_STUDENTS()
      .then((res) => {
        let data = isAdmin
          ? res.data
          : res.data
              .filter(
                (i) =>
                  i.active === true &&
                  i?.course === userData?.course &&
                  i?.courseYear === userData?.courseYear
              )
              .map((it) => {
                return {
                  ...it,
                  attendance: false,
                };
              });
        if (
          res.data &&
          res.data.filter(
            (i) =>
              i?.course === userData?.course &&
              i?.courseYear === userData?.courseYear
          ).length > 0 &&
          status
        ) {
          setLoading(true);
        } else {
          setLoading(false);
        }
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [cookies, userData, dispatch, value, formattedDate, status, isAdmin]);
  const getAttendance = () => {
    setLoading(false);
    GET_ATTENDANCE()
      .then((res) => {
        setAttData(res.data.filter((i) => i.active === true));
        const matchingAttendance = res.data.find(
          (i) =>
            i?.course === userData?.course &&
            i?.courseYear === userData?.courseYear &&
            i?.date === formattedDate
        );
        if (matchingAttendance) {
          let Name = allUsers.filter(
            (i) => i._id === matchingAttendance?.takenByTeacher_id
          );
          setFullName(
            `Attendance already taken by ${Name ? "You" : Name[0].fullName}.`
          );
          setStatus(true);
        } else {
          setStatus(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  };
  useEffect(() => {
    setLoading(false);
    GET_ATTENDANCE()
      .then((res) => {
        setAttData(res.data.filter((i) => i.active === true));
        const matchingAttendance = res.data.find(
          (i) =>
            i?.course === userData?.course &&
            i?.courseYear === userData?.courseYear &&
            i?.date === formattedDate
        );
        if (matchingAttendance) {
          let Name = allUsers.filter(
            (i) => i._id === matchingAttendance?.takenByTeacher_id
          );
          setFullName(
            `Attendance already taken by ${Name ? "You" : Name[0].fullName}.`
          );
          setStatus(true);
        } else {
          setStatus(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [cookies, userData, dispatch, value, formattedDate, allUsers]);

  return (
    <CustomTheme>
      <MiniDrawer>
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={<CalendarMonth sx={{ color: "#fff" }} />}
            text={"Manage Attendance"}
          />
          <Box sx={{ width: "100%", mt: 2 }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <PostAdd />
                      <Typography sx={{ ml: 1 }}>Add Attendance</Typography>
                    </Box>
                  }
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#000",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #000",
                      borderRadius: "5px",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <ContentPasteSearch />
                      <Typography sx={{ ml: 1 }}>View Attendance</Typography>
                    </Box>
                  }
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#000",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #000",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} sx={{ p: 0 }}>
              {data && data.length > 0 ? (
                <>
                  <Paper
                    elevation={0}
                    sx={{
                      p: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      background: Dark00FF(cookies),
                    }}
                  >
                    <Typography
                      sx={{
                        color: cookies.theme === "dark" ? "#fff" : "#000",
                        fontSize: "20px",
                        ml: 1,
                      }}
                    >
                      Date: {formattedDate}
                    </Typography>
                  </Paper>
                  <AddAttendance
                    formattedDate={formattedDate}
                    data={data}
                    setData={setData}
                    setCookie={setCookie}
                    cookies={cookies}
                    dispatch={dispatch}
                    setLoading={setLoading}
                    loading={loading}
                    fullName={fullName}
                    setFullName={setFullName}
                    setStatus={setStatus}
                    status={status}
                    userData={userData}
                  />
                </>
              ) : (
                <>
                  {loading === false && (
                    <Box
                      sx={{
                        height: "30vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <GroupIcon
                        sx={{
                          height: "80px",
                          width: "80px",
                          color: DarkFFF(cookies),
                        }}
                      />
                      <Typography
                        sx={{ fontSize: "20px", color: DarkFFF(cookies) }}
                      >
                        Students are not available in this batch.
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1} sx={{ p: 0 }}>
              <ViewAttendance
                cookies={cookies}
                AttData={AttData}
                userData={userData}
                data={data}
                getAttendance={getAttendance}
              />
            </TabPanel>
          </Box>
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default AttendanceIndex;
