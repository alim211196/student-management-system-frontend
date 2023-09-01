import { Box } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import { UPDATE_PROFILE } from "../../../ApiFunctions/users";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import PersonalInfo from "../../../Utils/PersonalInfo";
import EducationalInfo from "../../../Utils/EducationalInfo";
import AddressInfo from "../../../Utils/AddressInfo";
import FormButton from "../../../Utils/FormButton";
import { setLoading } from "../../../app/reducer/Loader";
const ChangeProfile = ({ cookies }) => {
  const { userData } = useSelector((state) => state?.getUserProfile);
  const loading = useSelector((state) => state.loading);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputDate = new Date();
  const isoDate = inputDate.toISOString();
  const formattedDate = isoDate.slice(0, 10);
  const dispatch = useDispatch();
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
    role: "",
  };
  const [formData, setFormData] = useState(DataObj);

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

  useEffect(() => {
    let formattedDate = "";
    if (userData?.dob) {
      try {
        const date = new Date(userData?.dob);
        formattedDate = date.toISOString().substring(0, 10);
      } catch (error) {
      }
    }

    setFormData({
      fullName: userData?.fullName,
      phone: userData?.phone,
      email: userData?.email,
      dob: formattedDate,
      gender: userData?.gender,
      course: userData?.course,
      courseYear: userData?.courseYear,
      address: userData?.address,
      city: userData?.city,
      pinCode: userData?.pinCode,
      state: userData?.state,
      country: userData?.country,
      role: userData?.role,
    });
    setSelectedFile(userData?.profileImage);
  }, [userData]);

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
    };
    dispatch(setLoading(true));
    UPDATE_PROFILE(userData?._id, newFormData,cookies?.token)
      .then((res) => {
        if (res.data) {
          dispatch(
            openSnackbar({
              message: res.data,
              severity: "success",
            })
          );
          window.location.reload();
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <PersonalInfo
        cookies={cookies}
        formData={formData}
        setFormData={setFormData}
        handleFileInputChange={handleFileInputChange}
        handleClear={handleClear}
        selectedFile={selectedFile}
      />
      {window.location.pathname !== "/manage-profile" && (
        <>
          <EducationalInfo
            cookies={cookies}
            formData={formData}
            setFormData={setFormData}
          />{" "}
          <AddressInfo
            cookies={cookies}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}

      <FormButton text={"Update Profile"} loading={loading} />
    </Box>
  );
};

export default memo(ChangeProfile);
