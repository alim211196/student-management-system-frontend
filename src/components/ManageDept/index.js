import React, { useState, useEffect } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import { Container, Box, Button } from "@mui/material";
import TitleBox from "../../Utils/TitleBox";
import MiniDrawer from "../Drawer";
import { AccountBalance } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import AddCourses from "./SubComp/AddCourses";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../app/reducer/Loader";
import AddIcon from "@mui/icons-material/Add";
import {
  ADD_COURSE,
  COURSE_ACTIVATION,
  GET_COURSES,
  UPDATE_COURSE,
} from "../../ApiFunctions/courses";
import { openSnackbar } from "../../app/reducer/Snackbar";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import ViewCourses from "./SubComp/ViewCourses";
import DialogBox from "../../Utils/DialogBox";
import { ContainerStyle } from "../../Utils/stylingMethods";
const ManageDepartment = () => {
  const [cookies] = useCookies(["token", "theme"]);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [ID, setID] = useState("");
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const DataObj = {
    course: "",
    years: 1,
  };
  const [formData, setFormData] = useState(DataObj);
  const [active, setActive] = useState(false);
  const [Courses, setCourses] = useState([]);

  const handleClose = () => {
    setDialogOpen(false);
    setID("");
  };
  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFlag("add");
    setFormData(DataObj);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const getCourse = () => {
    GET_COURSES()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };
  useEffect(() => {
   GET_COURSES()
     .then((res) => {
       setCourses(res.data);
     })
     .catch((err) => {
       errorHandler(err?.status, err?.data, dispatch);
     });
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);
    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) {
      dispatch(
        openSnackbar({
          message: "Please fill out all fields.",
          severity: "error",
        })
      );
      return;
    }
    const yearsArray = [];
    for (let i = 1; i <= parseInt(data.years); i++) {
      const year = getYear(i);

      yearsArray.push({ name: year, value: year.toLowerCase() });
    }

    const course = {
      name: data.course,
      value: data.course.toLowerCase(),
    };
    const newFormData = {
      course: course,
      years: yearsArray,
      active: true,
    };

    dispatch(setLoading(true));
    ADD_COURSE(newFormData,cookies?.token)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        setFormData(DataObj);
        getCourse();
        dispatch(setLoading(false));
        setFlag("");
        handleClickClose();
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  const getYear = (yearNumber) => {
    switch (yearNumber) {
      case 1:
        return "First year";
      case 2:
        return "Second year";
      case 3:
        return "Third year";
      case 4:
        return "Fourth year";
      case 5:
        return "Fifth year";
      default:
        return "";
    }
  };
  const handleEdit = (id) => {
    const selectedCourse = Courses.find((item) => item._id === id);
    if (selectedCourse) {
      setID(id);
      setOpen(true);
      setFlag("edit");
      setFormData({
        course: selectedCourse.course.name,
        years: selectedCourse.years.length,
      });
      setActive(selectedCourse.active);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);
    // Convert formData to an object
    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }
    // Check if all fields are filled
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) {
      dispatch(
        openSnackbar({
          message: "Please fill out all fields.",
          severity: "error",
        })
      );
      return;
    }
    const yearsArray = [];
    for (let i = 1; i <= parseInt(data.years); i++) {
      const year = getYear(i);

      yearsArray.push({ name: year, value: year.toLowerCase() });
    }

    const course = {
      name: data.course,
      value: data.course.toLowerCase(),
    };
    const newFormData = {
      course: course,
      years: yearsArray,
      active: active,
    };

    dispatch(setLoading(true));
    UPDATE_COURSE(ID, newFormData,cookies?.token)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        setFormData(DataObj);
        getCourse();
        dispatch(setLoading(false));
        setFlag("");
        handleClickClose();
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  const handleActiveState = () => {
    COURSE_ACTIVATION(ID, active,cookies?.token)
      .then((res) => {
        getCourse();
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
      <MiniDrawer>
        <Container maxWidth="xl" sx={ContainerStyle}>
          <TitleBox
            icon={<AccountBalance />}
            text={"Manage Department"}
            data={Courses}
            fileName={"courses_records"}
          />
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                mt: 1,
                mb: 1,
                ml: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "capitalize",
                  color:
                    cookies.theme === "dark" ? "#fff" : "#292929 !important",
                  background: cookies.theme === "dark" ? "#292929" : "#fff",
                  ":hover": {
                    color:
                      cookies.theme === "dark" ? "#fff" : "#292929 !important",
                    borderColor: "#fff",
                    background: cookies.theme === "dark" ? "#292929" : "#fff",
                  },
                }}
                onClick={handleClickOpen}
              >
                Create Course
              </Button>
            </Box>
            <ViewCourses
              cookies={cookies}
              Courses={Courses}
              handleEdit={handleEdit}
              handleActive={handleActive}
            />
          </Box>
        </Container>
      </MiniDrawer>
      <AddCourses
        formData={formData}
        setFormData={setFormData}
        cookies={cookies}
        loading={loading}
        open={open}
        handleClose={handleClickClose}
        flag={flag}
        handleSubmit={flag === "add" ? handleSubmit : handleUpdate}
      />
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleActiveState}
        text={
          active === true
            ? "Are your sure you want to activate this course?"
            : "Are your sure you want to deactivate this course?"
        }
      />
    </CustomTheme>
  );
};

export default ManageDepartment;
