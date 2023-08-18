import { Grid, Paper, Tooltip } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import CustomTheme from "../../../Utils/CustomTheme";
import { Dark00FF } from "../../../Utils/CommonCookies";
import CustomDropDown from "../../../Utils/CustomDropDown";
import CustomDateTextField from "../../../Utils/CustomDateTextField";
import { GET_COURSES } from "../../../ApiFunctions/courses";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import Fab from "@mui/material/Fab";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useDispatch } from "react-redux";
const FilterSection = ({
  cookies,
  formData,
  setFormData,
  filterFlag,
  setFilterFlag,
}) => {
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
  }, []);

  const coursesName = Courses.filter((i) => i.active === true).map(
    ({ course }) => ({
      name: course.name,
      value: course.value,
    })
  );

  const coursesYear = Courses.find(
    ({ course }) => course.value === formData.course
  )?.years;

  const buttonStyles = {
    position: "fixed",
    top: "140px",
    right: "40px",
    borderRadius: "50%",
    background: "#000",
    color: "white",
    width: "40px",
    height: "40px",
    transition: "all 0.3s ease",
  };

  return (
    <CustomTheme>
      {filterFlag === true && (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: Dark00FF(cookies),
            p: 0.8,
          }}
        >
          <Grid container spacing={2} sx={{ p: 2, mb: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomDropDown
                label={"Select course"}
                name="course"
                value={formData.course}
                setFormData={setFormData}
                data={coursesName}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomDropDown
                label={"Select year"}
                name="courseYear"
                value={formData.courseYear}
                setFormData={setFormData}
                data={coursesYear}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomDateTextField
                label={"Select date"}
                name="date"
                value={formData.date}
                setFormData={setFormData}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      <Fab
        sx={buttonStyles}
        size="small"
        color="secondary"
        onClick={() => {
          filterFlag ? setFilterFlag(false) : setFilterFlag(true);
        }}
      >
        <Tooltip
          title={filterFlag ? "Filter off" : "Filter on"}
          placement="right"
        >
          {filterFlag ? <FilterAltOffIcon /> : <FilterAltIcon />}
        </Tooltip>
      </Fab>
    </CustomTheme>
  );
};

export default memo(FilterSection);
