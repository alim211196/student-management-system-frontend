import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import MiniDrawer from "../../Drawer";
import { PersonSearch } from "@mui/icons-material";
import { setLoading } from "../../../app/reducer/Loader";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import { GET_USER, UPDATE_USER } from "../../../ApiFunctions/users";
import { Box, Container, CssBaseline } from "@mui/material";
import PersonalInfo from "../../../Utils/PersonalInfo";
import EducationalInfo from "../../../Utils/EducationalInfo";
import AddressInfo from "../../../Utils/AddressInfo";
import PasswordInfo from "../../../Utils/PasswordInfo";
import { useCookies } from "react-cookie";
import FormButton from "../../../Utils/FormButton";
import CustomTheme from "../../../Utils/CustomTheme";
import TitleBox from "../../../Utils/TitleBox";
import { useParams } from "react-router-dom";
import { ContainerStyle } from "../../../Utils/stylingMethods";

const ViewTeachers = () => {
  const loading = useSelector((state) => state.loading);
  const { id } = useParams();
  const [cookies] = useCookies(["theme"]);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

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
    password: "",
    role: "Teacher",
  };

  const [formData, setFormData] = useState({
    ...DataObj,
    confirm_password: "",
  });

 useEffect(() => {
   GET_USER(id)
     .then((res) => {
       if (id === res.data._id) {
         const data = res?.data;
         let formattedDate = "";
         if (data?.dob) {
           try {
             const date = new Date(data?.dob);
             formattedDate = date.toISOString().substring(0, 10);
           } catch (error) {
             console.error("Error parsing date:", error);
           }
         }
         setFormData({
           fullName: data?.fullName || "",
           email: data?.email || "",
           phone: data?.phone || "",
           dob: formattedDate,
           gender: data?.gender || "male",
           course: data?.course || "bca",
           courseYear: data?.courseYear || "first year",
           address: data?.address || "",
           city: data?.city || "",
           pinCode: data?.pinCode || "",
           state: data?.state || "",
           country: data?.country || "",
           password: data?.password || "",
           confirm_password: data?.password || "",
           role: data?.role || "Teacher",
         });
         setSelectedFile(data?.profileImage);
         setActive(data?.active);
         setDataLoaded(true); // Mark the data as loaded
       }
     })
     .catch((err) => {
       console.error("API Error:", err);
       errorHandler(err?.status, err?.data, dispatch);
     });
 }, [id, dispatch]);
  const handleFileInputChange = (e) => {
    let files = e.target.files;
    let fsize = files[0]?.size;

    const file = Math.round(fsize / 1024);

    if (file > 1024) {
      dispatch(
        openSnackbar({
          message: "Please upload an image less than 1MB.",
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
    UPDATE_USER(id, newFormData)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  if (!dataLoaded) {
    return null; // or render a loading state if desired
  }

  return (
    <CustomTheme>
      <MiniDrawer>
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={
              <PersonSearch
                sx={{ color: cookies.theme === "dark" ? "#fff" : "#000" }}
              />
            }
            text={"View Teacher"}
            id={id}
          />
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
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default memo(ViewTeachers);
