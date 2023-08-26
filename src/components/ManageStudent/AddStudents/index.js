import React, { memo, useState, useEffect } from "react";
import Forms from "./Forms";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import { CREATE_STUDENT } from "../../../ApiFunctions/students";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import { setLoading } from "../../../app/reducer/Loader";
const Dashboard = ({ getStudentData }) => {
  const { userData } = useSelector((state) => state?.getUserProfile);
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
    course: "",
    courseYear: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    role: "Student",
  };

  const [formData, setFormData] = useState(DataObj);

  useEffect(() => {
    if (userData && userData?.course && userData?.courseYear) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        course: userData?.course,
        courseYear: userData?.courseYear,
      }));
    }
  }, [userData]);

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
      active: true,
    };
    dispatch(setLoading(true));
    CREATE_STUDENT(newFormData)
      .then((res) => {
        getStudentData();
        dispatch(
          openSnackbar({
            message: "Student added successfully.",
            severity: "success",
          })
        );

        setFormData(DataObj);
        handleClear();
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <Forms
      handleFileInputChange={handleFileInputChange}
      handleClear={handleClear}
      selectedFile={selectedFile}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      flag={"add"}
      loading={loading}
    />
  );
};

export default memo(Dashboard);
