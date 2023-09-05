import React, { useState, memo, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomTheme from "../../Utils/CustomTheme";
import CustomButton from "../../Utils/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducer/Snackbar";
import CustomTextField from "../../Utils/CustomTextField";
import CustomMultilineTextField from "../../Utils/CustomMultilineTextField";
import { Paper, Typography } from "@mui/material";
import {POST_COMMENT } from "../../ApiFunctions/students";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { ContactStyle } from "./styles";
import SwipeableTextMobileStepper from "../../Utils/StepperComp";
import { CardBorder, Dark00FF } from "../../Utils/CommonCookies";
import CustomDropDown from "../../Utils/CustomDropDown";
import { Gender } from "../../Utils/DropdownArray";
import { setLoading } from "../../app/reducer/Loader";
import { GET_COURSES } from "../../ApiFunctions/courses";
const Contact = ({ Home, cookies }) => {
  const styles = ContactStyle(cookies);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const DataObj = {
    fullName: "",
    email: "",
    phone: "",
    gender: "male",
    course: "bca",
    courseYear: "first year",
    comment: "",
    active:true
  };
  const [formData, setFormData] = useState(DataObj);
  const [Courses, setCourses] = useState([]);
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
    dispatch(setLoading(true));
    POST_COMMENT(formData)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        setFormData(DataObj);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
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

  const coursesName = Courses.filter((i) => i.active === true).map(
    ({ course }) => ({
      name: course.name,
      value: course.value,
    })
  );

  const coursesYear = Courses.find(
    ({ course }) => course.value === formData.course
  )?.years;

  return (
    <CustomTheme>
      <Container component="main" maxWidth="lg" sx={{p:1}}>
        <CssBaseline />
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            zIndex: 1,
            position: "relative",
            borderRadius: "5px",
            background: Dark00FF(cookies),
            border: CardBorder(cookies, "#000"),
            boxShadow:'5px 5px 30px'
          }}
        >
          <Grid container component="main" sx={{ borderRadius: "5px" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={6}
              md={6}
              sx={{
                borderRadius: "5px",
              }}
            >
              <SwipeableTextMobileStepper cookies={cookies} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box sx={styles.innerBox}>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <Box sx={styles.MainContainer1}>
                    <Typography sx={styles.typo3}>Leave a Reply</Typography>
                    <Typography sx={styles.typo4}>
                      Your email address will not be published. Required fields
                      are marked *
                    </Typography>
                  </Box>
                  <Grid container spacing={2} sx={{ pb: 1, pl: 3, pr: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        label={"Full Name"}
                        name="fullName"
                        value={formData.fullName}
                        setFormData={setFormData}
                        type="text"
                        disabled={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        label={"Email Address"}
                        name="email"
                        value={formData.email}
                        setFormData={setFormData}
                        type="email"
                        disabled={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        label={"Mobile number"}
                        name="phone"
                        value={formData.phone}
                        setFormData={setFormData}
                        type="number"
                        disabled={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomDropDown
                        label={"Gender"}
                        name="gender"
                        value={formData.gender}
                        setFormData={setFormData}
                        data={Gender}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {" "}
                      <CustomDropDown
                        label={"Select course"}
                        name="course"
                        value={formData.course}
                        setFormData={setFormData}
                        data={coursesName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {" "}
                      <CustomDropDown
                        label={"Select batch"}
                        name="courseYear"
                        value={formData.courseYear}
                        setFormData={setFormData}
                        data={coursesYear}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <CustomMultilineTextField
                        label={"Comment"}
                        name="comment"
                        value={formData.comment}
                        setFormData={setFormData}
                        type="text"
                        disabled={false}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{ pb: 1, pl: 3, pr: 3 }}
                  >
                    <Grid item xs={12} sm={6}>
                      <CustomButton
                        text={"Post Your Comment"}
                        loading={loading}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CustomTheme>
  );
};
export default memo(Contact);
