import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import { setLoading } from "../../../app/reducer/Loader";
import { Box } from "@mui/material";
import PersonalInfo from "../../../Utils/PersonalInfo";
import PasswordInfo from "../../../Utils/PasswordInfo";
import EducationalInfo from "../../../Utils/EducationalInfo";
import AddressInfo from "../../../Utils/AddressInfo";
import FormButton from "../../../Utils/FormButton";
import { useCookies } from "react-cookie";
import { USER_REGISTER } from "../../../ApiFunctions/users";
const AddTeacher = ({ getTeacherData }) => {
  const [cookies] = useCookies(["theme"]);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
const inputDate = new Date();
const isoDate = inputDate.toISOString();
const formattedDate = isoDate.slice(0, 10);
  const DataObj = {
    fullName: "",
    email: "",
    phone: "",
    dob: formattedDate,
    gender: "male",
    course: "bca",
    courseYear: "first year",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    password: "",
    role: "Teacher",
    active: true,
  };

  const [formData, setFormData] = useState({
    ...DataObj,
    confirm_password: "",
  });

  const handleFileInputChange = (e) => {
    let files = e.target.files;
    let fsize = files[0]?.size;

    const file = Math.round(fsize / 1024);

    if (file > 100) {
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
    const { password, confirm_password } = data;
    if (password !== confirm_password) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }

    const newFormData = {
      ...formData,
      profileImage: selectedFile,
    };
    dispatch(setLoading(true));
    USER_REGISTER(newFormData)
      .then((res) => {
        getTeacherData();
        dispatch(
          openSnackbar({
            message: "Teacher added successfully.",
            severity: "success",
          })
        );

        setFormData({
          ...DataObj,
          confirm_password: "",
        });
        handleClear();
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <PersonalInfo
        handleFileInputChange={handleFileInputChange}
        handleClear={handleClear}
        cookies={cookies}
        formData={formData}
        setFormData={setFormData}
        selectedFile={selectedFile}
      />
      <EducationalInfo
        cookies={cookies}
        formData={formData}
        setFormData={setFormData}
      />
      <AddressInfo
        cookies={cookies}
        formData={formData}
        setFormData={setFormData}
      />
      <PasswordInfo
        cookies={cookies}
        formData={formData}
        setFormData={setFormData}
      />
      <FormButton
        cookies={cookies}
        text={"Submit Your Form"}
        loading={loading}
      />
    </Box>
  );
};

export default memo(AddTeacher);
