import React, { memo } from "react";
import PaperWrapper from "../../../Utils/PaperWrapper";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { Box, Grid, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import { DarkFFF } from "../../../Utils/CommonCookies";
const ViewCourses = ({ cookies, Courses, handleEdit, handleActive }) => {
  return (
    <PaperWrapper
      cookies={cookies}
      boxBGColor={"#292"}
      icon={<ViewStreamIcon />}
      text={"List of Courses"}
    >
      {Courses && Courses.length > 0 ? (
        <Grid container spacing={2} sx={{ p: 2, mb: 1 }}>
          {Courses.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CourseCard
                  cookies={cookies}
                  item={item}
                  handleEdit={handleEdit}
                  handleActive={handleActive}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: DarkFFF(cookies),
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {" "}
            No Courses available
          </Typography>
        </Box>
      )}
    </PaperWrapper>
  );
};

export default memo(ViewCourses);
