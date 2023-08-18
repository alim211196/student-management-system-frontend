import React, { memo, useState, useEffect } from "react";
import PaperWrapper from "./PaperWrapper";
import { Grid } from "@mui/material";
import CustomDropDown from "./CustomDropDown";
import { School } from "@mui/icons-material";
import { errorHandler } from "../ApiFunctions/ErrorHandler";
import CustomTextField from "./CustomTextField";
import { GET_COURSES } from "../ApiFunctions/courses";
import { useDispatch } from "react-redux";

const EducationalInfo = ({ cookies, formData, setFormData }) => {
  const dispatch = useDispatch();
  const [Courses, setCourses] = useState([]);
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
    const student = formData?.role === "Student"
  const  pathname =  ["/manage-account"].includes(window.location.pathname)

  return (
    <PaperWrapper
      cookies={cookies}
      boxBGColor={"#EC407A"}
      icon={<School />}
      text={"Educational Info"}
    >
      <Grid container spacing={2} sx={{ p: 2, mb: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          {student || pathname ? (
            <CustomTextField
              label={"Course"}
              name="course"
              value={formData?.course}
              setFormData={setFormData}
              type="text"
              disabled={true}
              admin={false}
            />
          ) : (
            <CustomDropDown
              label={"Select faculty"}
              name="course"
              value={formData.course}
              setFormData={setFormData}
              data={coursesName}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          {student || pathname ? (
            <CustomTextField
              label={"Batch"}
              name="courseYear"
              value={formData?.courseYear}
              setFormData={setFormData}
              type="text"
              disabled={true}
              admin={false}
            />
          ) : (
            <CustomDropDown
              label={"Select batch"}
              name="courseYear"
              value={formData.courseYear}
              setFormData={setFormData}
              data={coursesYear}
            />
          )}
        </Grid>
      </Grid>
    </PaperWrapper>
  );
};

export default memo(EducationalInfo);
