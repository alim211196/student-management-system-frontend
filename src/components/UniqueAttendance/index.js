import React, { useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { Container } from "@mui/material";
import TitleBox from "../../Utils/TitleBox";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import TopSection from "./SubComp/TopSection";
import AttendanceInfo from "./SubComp/AttendanceInfo";
import StudentsList from "./SubComp/StudentsList";
import AttendanceGraphChart from "./SubComp/AttendanceGraphChart";
import { GET_ATTENDANCE_BY_ID } from "../../ApiFunctions/attendance";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { ContainerStyle } from "../../Utils/stylingMethods";

const UniqueIndex = () => {
  const { id } = useParams();
  const [AttData, setAttData] = useState([]);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["theme"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GET_ATTENDANCE_BY_ID(id)
      .then((res) => {
        setAttData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [dispatch, id]);

  return (
    <CustomTheme>
      <MiniDrawer>
        <Container maxWidth="xl" sx={ContainerStyle}>
          <TitleBox
            icon={<AddchartIcon/>}
            text={"View Attendance"}
            id={id}
          />{" "}
          <TopSection cookies={cookies} AttData={AttData} loading={loading} />
          <AttendanceInfo cookies={cookies} AttData={AttData} />
          <StudentsList
            cookies={cookies}
            data={AttData?.attendance}
            id={id}
            loading={loading}
          />
          <AttendanceGraphChart cookies={cookies} AttData={AttData} />
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default UniqueIndex;
