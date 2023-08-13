import { Container, CssBaseline } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { useCookies } from "react-cookie";
import TitleBox from "../../Utils/TitleBox";
import {
  People,
  PersonAddAlt1,
  PersonSearch,
} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddTeacher from "./AddTeacher/index";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { TabPanel, a11yProps } from "../../Utils/TabPanel";
import { GET_USERS, USER_ACTIVATION } from "../../ApiFunctions/users";
import ExcelExport from "../../Utils/ExcelExport";
import { openSnackbar } from "../../app/reducer/Snackbar";
import { SearchWithFuse } from "../../Utils/SearchWithFuse";
import DialogBox from "../../Utils/DialogBox";
import CardContainer from "../../Utils/CardContainer";
import { useNavigate } from "react-router-dom";
import { ContainerStyle } from "../../Utils/stylingMethods";
const ManageTeacher = () => {
  const { userData } = useSelector((state) => state.getUserProfile);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["theme", "UserId"]);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [ID, setID] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const getTeacherData = () => {
    GET_USERS()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  useEffect(() => {
    setLoading(true);
    GET_USERS()
      .then((res) => {
        setLoading(false);
        setData(res.data);
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
  const handleActiveState = () => {
    USER_ACTIVATION(ID, active)
      .then((res) => {
        getTeacherData();
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

  const newResults = SearchWithFuse(
    ["fullName", "email", "phone", "course", "courseYear"],
    query,
    data
  );
  const handleRedirect = (id) => {
    navigate(`/manage-teachers/${id}`);
  };

  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };
  return (
    <CustomTheme>
      <MiniDrawer
        setQuery={setQuery}
        query={query}
        data={data}
        value={value}
      >
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={
              <People
                sx={{ color: cookies.theme === "dark" ? "#fff" : "#2C497F" }}
              />
            }
            text={"Manage Teachers"}
            data={data}
            fileName={"teachers_records"}
          />

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                      <PersonAddAlt1 />
                      <Typography sx={{ ml: 1 }}>Add Teacher</Typography>
                    </Box>
                  }
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#2C497F",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #2C497F",
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
                      <Typography sx={{ ml: 1 }}>View Teachers</Typography>
                    </Box>
                  }
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#2C497F",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #2C497F",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Tabs>
              {value === 1 && (
                <Box>
                  <ExcelExport
                    userData={userData}
                    data={data}
                    fileName={"teachers_records"}
                  />
                </Box>
              )}
            </Box>
            <TabPanel value={value} index={0} sx={{ p: 0 }}>
              <AddTeacher getTeacherData={getTeacherData} />
            </TabPanel>
            <TabPanel value={value} index={1} sx={{ p: 0 }}>
              <CardContainer
                setQuery={setQuery}
                query={query}
                parentComp={"Manage Teachers"}
                handleEdit={handleRedirect}
                handleActive={handleActive}
                data={newResults}
                loading={loading}
              />
            </TabPanel>
          </Box>
        </Container>
        <DialogBox
          open={dialogOpen}
          handleClose={handleClose}
          handleChange={handleActiveState}
          text={
            active === true
              ? "Are your sure you want to activate this user?"
              : "Are your sure you want to deactivate this user?"
          }
        />
      </MiniDrawer>
    </CustomTheme>
  );
};

export default ManageTeacher;
