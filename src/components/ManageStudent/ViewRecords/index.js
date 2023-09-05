import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import Forms from "../AddStudents/Forms";
import MiniDrawer from "../../Drawer";
import {
  GET_STUDENT_BY_ID,
  UPDATE_STUDENT,
} from "../../../ApiFunctions/students";
import { setLoading } from "../../../app/reducer/Loader";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import CustomTheme from "../../../Utils/CustomTheme";
import { Container, CssBaseline } from "@mui/material";
import TitleBox from "../../../Utils/TitleBox";
import { PersonSearch } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { ContainerStyle } from "../../../Utils/stylingMethods";
import { useCookies } from "react-cookie";
const ViewRecords = () => {
  const dispatch = useDispatch();
    const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const loader = useSelector((state) => state.loading);
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState(false);
  const DataObj = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "male",
    course: "bca",
    courseYear: "first year",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    role: "Student",
  };
  const [formData, setFormData] = useState(DataObj);

  useEffect(() => {
    GET_STUDENT_BY_ID(id, cookies?.token)
      .then((res) => {
        if (id === res.data._id) {
          const data = res?.data;
          const date = new Date(data.dob);
          const formattedDate = date.toISOString().substring(0, 10);
          setFormData({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            dob: formattedDate,
            gender: data.gender,
            course: data.course,
            courseYear: data.courseYear,
            address: data.address,
            city: data.city,
            pinCode: data.pinCode,
            state: data.state,
            country: data.country,
            role: data.role,
          });
          setSelectedFile(data.profileImage);
          setActive(data.active);
        }
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  }, [id, dispatch, cookies?.token]);


  const handleFileInputChange = (e) => {
    let files = e.target.files;
    let fsize = files[0]?.size;

    const file = Math.round(fsize / 1024);

    if (file > 1024) {
      dispatch(
        openSnackbar({
          message: "Please upload image less than 1MB.",
          severity: "error",
        })
      );
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };
  };
  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleSubmit = (event) => {
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
    const newFormData = {
      ...formData,
      profileImage: selectedFile,
      active: active,
    };
    dispatch(setLoading(true));
    UPDATE_STUDENT(id, newFormData,cookies?.token)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        // setFormData(DataObj);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <CustomTheme>
      <MiniDrawer>
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={<PersonSearch/>}
            text={"View Student"}
            id={id}
          />

          <Forms
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            title={"Please update student details properly"}
            handleFileInputChange={handleFileInputChange}
            handleClear={handleClear}
            selectedFile={selectedFile}
            loading={loader}
          />
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default memo(ViewRecords);
