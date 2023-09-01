import React, { useEffect, useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { Container, Grid, useMediaQuery } from "@mui/material";
import TitleBox from "../../Utils/TitleBox";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useDispatch } from "react-redux";
import { GET_STUDENT_ATTENDANCE } from "../../ApiFunctions/attendance";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import DatePickerSection from "./SubComp/DatePickerSection";
import StudentInfo from "./SubComp/StudentInfo";
import AttendanceList from "./SubComp/AttendanceList";
import AttendanceGraphChart from "./SubComp/AttendanceGraphChart";
import PaperWrapper from "../../Utils/PaperWrapper";
import { ContainerStyle } from "../../Utils/stylingMethods";
const UniqueStudentAttendance = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["theme", "token"]);
  const matches = useMediaQuery("(min-width:600px)");
  const [studentAttendance, setStudentAttendance] = useState([]);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Format the start and end dates to "YYYY-MM-DD" for API request
    const formattedStartDate = startDate?.toISOString()?.split("T")[0];
    const formattedEndDate = endDate
      ? endDate.toISOString().split("T")[0]
      : formattedStartDate; // Set endDate to startDate if it's null

    GET_STUDENT_ATTENDANCE(
      id,
      formattedStartDate,
      formattedEndDate,
      cookies?.token
    )
      .then((res) => {
        setStudentAttendance(res?.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [dispatch, id, startDate, endDate, cookies?.token]);

  const attendanceLengthChecker =
    studentAttendance?.attendanceCounterArray?.length > 0;
  return (
    <CustomTheme>
      <MiniDrawer>
        <Container maxWidth="xl" sx={ContainerStyle}>
          <TitleBox
            icon={<AddchartIcon />}
            text={"View Monthly Attendance"}
            id={id}
          />
          <DatePickerSection
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            cookies={cookies}
            matches={matches}
          />
          <StudentInfo cookies={cookies} data={studentAttendance} />
          {attendanceLengthChecker && (
            <>
              <PaperWrapper
                cookies={cookies}
                boxBGColor={"#EC407A"}
                icon={<PlaylistAddCheckIcon />}
                text={"Student attendance list"}
              >
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {studentAttendance?.overallAttendance?.map(
                    (studentAtt, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          lg={3}
                          key={studentAtt._id}
                        >
                          <AttendanceList
                            cookies={cookies}
                            data={studentAtt}
                            index={index}
                          />
                        </Grid>
                      );
                    }
                  )}{" "}
                </Grid>
              </PaperWrapper>
              <AttendanceGraphChart
                cookies={cookies}
                StuData={studentAttendance}
              />
            </>
          )}
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default UniqueStudentAttendance;
