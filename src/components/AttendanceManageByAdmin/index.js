import React, { useEffect, useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import { Container } from "@mui/material";
import TitleBox from "../../Utils/TitleBox";
import MiniDrawer from "../Drawer";
import { Equalizer } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  ATTENDANCE_ACTIVATION,
  GET_ATTENDANCE,
} from "../../ApiFunctions/attendance";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import DialogBox from "../../Utils/DialogBox";
import { openSnackbar } from "../../app/reducer/Snackbar";
import { ContainerStyle } from "../../Utils/stylingMethods";
import CardContainer from "../../Utils/CardContainer";
import { SearchWithFuse } from "../../Utils/SearchWithFuse";
import { useNavigate } from "react-router-dom";

const ManageAttendanceByAdmin = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [AttData, setAttData] = useState([]);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [ID, setID] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getAttendance = () => {
    GET_ATTENDANCE()
      .then((res) => {
        setAttData(res.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };
  useEffect(() => {
    setLoading(true);
    GET_ATTENDANCE()
      .then((res) => {
        setLoading(false);
        setAttData(res.data);
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
  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };

  const handleActiveState = () => {
    ATTENDANCE_ACTIVATION(ID, active)
      .then((res) => {
        getAttendance();
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
    ["course", "courseYear", "teacherName", "date"],
    query,
    AttData
  );

  const handleRedirect = (id, active) => {
    if (active === true) {
      navigate(`/manage-students-attendance/${id}`);
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
    <CustomTheme>
      <MiniDrawer
        setQuery={setQuery}
        query={query}
        data={AttData}
        flag={false}
        value={1}
      >
        <Container maxWidth="xl" sx={ContainerStyle}>
          <TitleBox
            icon={<Equalizer />}
            text={"Manage Attendance"}
          />
          <CardContainer
            setQuery={setQuery}
            query={query}
            parentComp={"Manage Attendance"}
            handleEdit={handleRedirect}
            handleActive={handleActive}
            data={newResults}
            loading={loading}
          />
        </Container>
        <DialogBox
          open={dialogOpen}
          handleClose={handleClose}
          handleChange={handleActiveState}
          text={
            active === true
              ? "Are your sure you want to activate this attendance?"
              : "Are your sure you want to deactivate this attendance?"
          }
        />
      </MiniDrawer>
    </CustomTheme>
  );
};

export default ManageAttendanceByAdmin;
