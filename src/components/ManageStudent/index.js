import { Button, Container, CssBaseline } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { useCookies } from "react-cookie";
import TitleBox from "../../Utils/TitleBox";
import {
  People,
  PersonAddAlt1,
  PersonSearch,
  ArrowBack,
} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddStudents from "./AddStudents/index";
import {
  GET_STUDENTS,
  STUDENT_RECORD_ACTIVATION,
} from "../../ApiFunctions/students";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { TabPanel, a11yProps } from "../../Utils/TabPanel";
import { SearchWithFuse } from "../../Utils/SearchWithFuse";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Utils/DialogBox";
import { openSnackbar } from "../../app/reducer/Snackbar";
import CardContainer from "../../Utils/CardContainer";
import { ContainerStyle } from "../../Utils/stylingMethods";
const ManageStudent = () => {
  const { userData } = useSelector((state) => state.getUserProfile);
  const dispatch = useDispatch();
  const [ID, setID] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [cookies] = useCookies(["token", "theme"]);
  const [flag, setFlag] = useState(false);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const getStudentData = () => {
    GET_STUDENTS(cookies?.token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  useEffect(() => {
    setLoading(true);
    GET_STUDENTS(cookies?.token)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [dispatch, cookies?.token]);

  const backFun = () => {
    getStudentData();
    setFlag(false);
  };

  const newResults = SearchWithFuse(
    ["fullName", "email", "phone", "course", "courseYear"],
    query,
    data
  );

  const handleRedirect = (id) => {
    if (userData?.role === "Admin") {
      navigate(`/manage-students-account/${id}`);
    } else {
      navigate(`/manage-students/${id}`);
    }
  };
  const handleClose = () => {
    setDialogOpen(false);
    setID("");
  };
  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };
  const handleActiveState = () => {
    STUDENT_RECORD_ACTIVATION(ID, active,cookies?.token)
      .then((res) => {
        getStudentData();
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
  return (
    <CustomTheme>
      <MiniDrawer
        setQuery={setQuery}
        query={query}
        data={data}
        value={userData?.role === "Admin" ? 1 : value}
      >
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={<People />}
            text={"Manage Students"}
            data={data}
            fileName={"students_records"}
          />
          {userData?.role === "Admin" ||
          window.location.pathname === "/manage-students-account" ? (
            <CardContainer
              setQuery={setQuery}
              query={query}
              parentComp={"View Records"}
              handleEdit={handleRedirect}
              handleActive={handleActive}
              data={newResults}
              loading={loading}
            />
          ) : (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  borderBottom: !(flag === true && value === 1) && 1,
                  borderColor: !(flag === true && value === 1) && "divider",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {flag === true && value === 1 ? (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      textTransform: "capitalize",
                      color: cookies.theme === "dark" ? "#fff" : "#000",
                      background: cookies.theme === "dark" && "#000",
                    }}
                    onClick={backFun}
                  >
                    Back
                  </Button>
                ) : (
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
                          <PersonAddAlt1 />
                          <Typography sx={{ ml: 1 }}>Add Student</Typography>
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
                          <PersonSearch />
                          <Typography sx={{ ml: 1 }}>View Students</Typography>
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
                )}
              </Box>
              <TabPanel value={value} index={0} sx={{ p: 0 }}>
                <AddStudents
                  getStudentData={getStudentData}
                  cookies={cookies}
                />
              </TabPanel>
              <TabPanel value={value} index={1} sx={{ p: 0 }}>
                <CardContainer
                  setQuery={setQuery}
                  query={query}
                  parentComp={"View Records"}
                  handleEdit={handleRedirect}
                  handleActive={handleActive}
                  data={newResults}
                  loading={loading}
                />
              </TabPanel>
            </Box>
          )}
        </Container>
        <DialogBox
          open={dialogOpen}
          handleClose={handleClose}
          handleChange={handleActiveState}
          text={
            active === true
              ? "Are your sure you want to activate this student?"
              : "Are your sure you want to deactivate this student?"
          }
        />
      </MiniDrawer>
    </CustomTheme>
  );
};

export default ManageStudent;
