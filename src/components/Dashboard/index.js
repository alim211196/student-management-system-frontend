import React, { useEffect, useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer/index";
import { Container, Grid, useMediaQuery } from "@mui/material";

import {
  School,
  SupervisedUserCircle,
  LocalLibrary,
  RecentActors,
  Celebration,
  Sms,
  Person,
  DisplaySettings,
} from "@mui/icons-material/";
import CardList from "./DashboardSubComp/CardList";
import ProfileSection from "./DashboardSubComp/ProfileSection";
import UserDataList from "./DashboardSubComp/UserDataList";
import RecentMessageList from "./DashboardSubComp/RecentMessageList";
import { GET_RECENT_ENTRY, GET_RESOURCE } from "../../ApiFunctions/students";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import BirthDayList from "./DashboardSubComp/BirthDayList";
import TitleBox from "../../Utils/TitleBox";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ContainerStyle } from "../../Utils/stylingMethods";
const Dashboard = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentTeachers, setRecentTeachers] = useState([]);
  const [cookies, removeCookie] = useCookies(["token","theme"]);
  const { userData } = useSelector((state) => state.getUserProfile);
  const iconStyle = {
    width: "80px",
    height: "80px",
    color: "#fff",
  };

  useEffect(() => {
    setLoading(true);
    GET_RESOURCE(cookies?.token)
      .then((res) => {
        setResources(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
    GET_RECENT_ENTRY(cookies?.token)
      .then((res) => {
        setLoading(false);
        setRecentMessages(res?.data?.recentMessages);
        setRecentStudents(res?.data?.recentStudents);
        setRecentTeachers(res?.data?.recentTeachers);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [dispatch, cookies?.token]);
  return (
    <CustomTheme>
      <MiniDrawer>
        <Container maxWidth="xl" sx={ContainerStyle}>
          <TitleBox icon={<DisplaySettings />} text={"Dashboard"} />
          <Grid container spacing={2}>
            <CardList
              topColor={"#EF5350"}
              icon={<School sx={iconStyle} />}
              quantity={resources?.noOfStudents}
              bottomColor={"#B71C1C"}
              text={"Total Students"}
              loading={loading}
              cookies={cookies}
            />
            <CardList
              topColor={"#EC407A"}
              icon={<SupervisedUserCircle sx={iconStyle} />}
              quantity={resources?.noOfTeacher}
              bottomColor={"#880E4F"}
              text={"Total Teachers"}
              loading={loading}
              cookies={cookies}
            />
            <CardList
              topColor={"#AB47BC"}
              icon={<LocalLibrary sx={iconStyle} />}
              quantity={resources?.noOfCourses}
              bottomColor={"#4A148C"}
              text={"Total Courses"}
              loading={loading}
              cookies={cookies}
            />
            <CardList
              topColor={"#4CAF50"}
              icon={<RecentActors sx={iconStyle} />}
              quantity={resources?.noOfBatches}
              bottomColor={"#1B5E20"}
              text={"Total Batches"}
              loading={loading}
              cookies={cookies}
            />
            <ProfileSection
              removeCookie={removeCookie}
              cookies={cookies}
              matches={matches}
              bgColor={"#2C497F"}
              title={"Your profile details"}
              icon={<Person sx={{ mr: 1 }} />}
              loading={loading}
              userData={userData}
            />
            <UserDataList
              cookies={cookies}
              data={recentStudents}
              bgColor={"#EF5350"}
              title={"Recently added students"}
              icon={<School sx={{ mr: 1 }} />}
              loading={loading}
              userData={userData}
              matches={matches}
            />
            <UserDataList
              cookies={cookies}
              data={recentTeachers}
              bgColor={"#EC407A"}
              title={"Recently joined teachers"}
              icon={<SupervisedUserCircle sx={{ mr: 1 }} />}
              loading={loading}
              userData={userData}
              matches={matches}
            />
            <BirthDayList
              cookies={cookies}
              userData={userData}
              bgColor={"#AB47BC"}
              title={"Celebrating birthday"}
              icon={<Celebration sx={{ mr: 1 }} />}
              matches={matches}
            />
            <RecentMessageList
              cookies={cookies}
              data={recentMessages}
              bgColor={"#4CAF50"}
              title={"Recent messages"}
              icon={<Sms sx={{ mr: 1 }} />}
              loading={loading}
              userData={userData}
              matches={matches}
            />
          </Grid>
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default Dashboard;
