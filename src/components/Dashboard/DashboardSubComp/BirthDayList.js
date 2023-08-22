import React, { memo, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { GET_BIRTHDAY } from "../../../ApiFunctions/students";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import {
  CardBorder,
  Dark00FF,
  DarkFFF,
  IconColor,
} from "../../../Utils/CommonCookies";
import CakeIcon from "@mui/icons-material/Cake";
import { SEND_WISHES } from "../../../ApiFunctions/users";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import DialogBox from "../../../Utils/DialogBox";
import { useDispatch } from "react-redux";
const BirthDayList = ({ cookies, icon, title, bgColor, userData, matches }) => {
  const [value, setValue] = useState("student");
  const [studentBirthday, setStudentBirthday] = useState([]);
  const [teacherBirthday, setTeacherBirthday] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = userData.role === "Admin";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ID, setID] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getBirthday = () => {
    setLoading(true);
    GET_BIRTHDAY()
      .then((res) => {
        setLoading(false);
        setStudentBirthday(res?.data?.studentsBirthday);
        setTeacherBirthday(res?.data?.teachersBirthday);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  };
  useEffect(() => {
    setLoading(true);
    GET_BIRTHDAY()
      .then((res) => {
        setLoading(false);
        setStudentBirthday(res?.data?.studentsBirthday);
        setTeacherBirthday(res?.data?.teachersBirthday);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [dispatch]);

  const handleClose = () => {
    setDialogOpen(false);
    setID("");
  };

  const handleWished = (id) => {
    setDialogOpen(true);
    setID(id);
  };

  const handleSendWishes = () => {
    const AllUser = [...studentBirthday, ...teacherBirthday];
    const filteredDetails = AllUser.filter((i) => i?._id === ID);

    const formData = {
      fullName: filteredDetails[0]?.fullName,
      email: filteredDetails[0]?.email,
      dob: filteredDetails[0]?.dob,
    };
    const _id = filteredDetails[0]?._id;
    SEND_WISHES(_id, formData)
      .then((res) => {
        getBirthday();
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  const CommonUI = ({ data, cookies }) => {
    const filteredData = isAdmin
      ? data
      : data?.filter(
          (i) =>
            i?.course === userData?.course &&
            i?.courseYear === userData?.courseYear
        );

    if (filteredData.length > 0) {
      return (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            height: "175px",
            paddingBottom: "10px",
            background: Dark00FF(cookies),
            border: CardBorder(cookies, bgColor),
            borderTop: "none !important",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
            "&::-webkit-scrollbar": {
              width: "2px",
              background: Dark00FF(cookies),
            },
            "&::-webkit-scrollbar-thumb": {
              background: bgColor,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <List
            sx={{
              pt: 0,
              width: "100%",
            }}
          >
            {filteredData?.map((item, index) => {
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={item?.profileImage}
                          sx={{ border: `1px solid ${bgColor}` }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                              fontWeight: "bold",
                              color: DarkFFF(cookies),
                            }}
                          >
                            {item?.fullName}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: DarkFFF(cookies),
                            }}
                          >
                            {item?.email}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {isAdmin && (
                      <Tooltip title="Send Wishes" placement="top">
                        <IconButton
                          onClick={() => handleWished(item?._id)}
                          disabled={item?.isWished === true}
                        >
                          <CakeIcon
                            sx={{ fontSize: 20, color: IconColor(cookies) }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  <Divider variant="inset" component="li" />
                </Box>
              );
            })}
          </List>
        </Paper>
      );
    } else {
      return (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            height:"175px",
            paddingBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: Dark00FF(cookies),
            border: CardBorder(cookies, bgColor),
            borderTop: "none !important",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          {" "}
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Typography sx={{ color: DarkFFF(cookies) }}>
              Data not found
            </Typography>
          )}
        </Paper>
      );
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Box
          sx={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            transition: "transform 500ms ease",
            "&:hover": {
              transform: `scale(1.025)`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              background: bgColor,
              color: "#fff",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            {icon}
            <Typography>{title}</Typography>
          </Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  background: Dark00FF(cookies),
                }}
              >
                <TabList
                  onChange={handleChange}
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: bgColor,
                    },
                  }}
                >
                  <Tab
                    label="Student"
                    value="student"
                    sx={{
                      textTransform: "capitalize",
                      color: DarkFFF(cookies),
                      background: Dark00FF(cookies),
                      "&.Mui-selected": {
                        color: cookies.theme === "dark" && "#fff",
                      },
                    }}
                  />
                  <Tab
                    label="Teacher"
                    value="teacher"
                    sx={{
                      textTransform: "capitalize",
                      color: DarkFFF(cookies),
                      background: Dark00FF(cookies),
                      "&.Mui-selected": {
                        color: cookies.theme === "dark" && "#fff",
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="student" sx={{ p: 0 }}>
                <CommonUI data={studentBirthday} cookies={cookies} />
              </TabPanel>
              <TabPanel value="teacher" sx={{ p: 0 }}>
                <CommonUI data={teacherBirthday} cookies={cookies} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Grid>
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleSendWishes}
        text={"Are your sure you want to wish this person ?"}
      />
    </>
  );
};

export default memo(BirthDayList);
