import { Box, Container, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import SMSImage from './images/students.png'
import TMSImage from "./images/teachers.png";
import AMSImage from "./images/attendance.png";
import CMImage from "./images/courses.png";
import PUImage from "./images/profile.png";
import SQImage from "./images/comment.png";
import { DarkFF4F } from "../../Utils/CommonCookies";
const FeaturesInfo = ({ matches, cookies }) => {
  const imageTextArray = [
    {
      image: SMSImage,
      position: "left",
      title: "Student Management System",
      subTitle: "Effortless Student Records:",
      description:
        "Admins manage student personal, educational, and address information. Students can contact us through the contact form for any queries.",
    },
    {
      image: SQImage,
      position: "right",
      title: "Student Queries",
      subTitle: "Direct Student Support:",
      description:
        "Students can use the contact form to submit queries, and our admin team responds promptly, creating a supportive learning environment.",
    },
    {
      image: TMSImage,
      position: "left",
      title: "Teacher Management System",
      subTitle: "Empowering Educators:",
      description:
        "Admins oversee teacher records, permissions, and attendance. They also manage student queries efficiently.",
    },
    {
      image: CMImage,
      position: "right",
      title: "Course Management",
      subTitle: "Managing Course Information:",
      description:
        "Easily organize and update course details for various academic and extracurricular offerings.",
    },
    {
      image: AMSImage,
      position: "left",
      title: "Attendance Management System",
      subTitle: "Streamlined Attendance Tracking:",
      description:
        "Admins maintain monthly attendance records for all students, ensuring accuracy and resolving issues promptly.",
    },
    {
      image: PUImage,
      position: "right",
      title: "Profile Update",
      subTitle: "Admin and Teacher Profiles:",
      description:
        "Admins and teachers can update their profiles to ensure accuracy and relevance, enhancing their online presence.",
    },
  ];

  return (
    <Container
      maxWidth={matches ? "lg" : "md"}
      sx={{ mt: 5, mb: 2, zIndex: "1", position: "relative" }}
    >
      <Grid container spacing={2}>
        {imageTextArray.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {matches && item.position === "right" ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: !matches && 1,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: !matches && "center",
                        color: "transparent",
                        fontWeight: 900,
                        WebkitTextStroke: "1px #6575EF",
                        fontSize: "28px",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        ml: !matches && 1,
                        fontSize: "20px",
                        fontWeight: "400",
                        color: DarkFF4F(cookies),
                      }}
                    >
                      <strong>{item.subTitle}</strong>
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: !matches && 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        backgroundSize: "cover !important",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        background: `url(${item.image})`,
                        transition: "transform 500ms ease",
                        "&:hover": {
                          transform: `scale(1.05)`,
                        },
                        width: "360px",
                        height: "240px",
                      }}
                    ></Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: !matches && 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        backgroundSize: "cover !important",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        background: `url(${item.image})`,
                        transition: "transform 500ms ease",
                        "&:hover": {
                          transform: `scale(1.05)`,
                        },
                        width: "360px",
                        height: "240px",
                      }}
                    ></Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: !matches && 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "28px",
                        textAlign: !matches && "center",
                        color: "transparent",
                        fontWeight: 900,
                        WebkitTextStroke: "1px #AD3ACD",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        ml: !matches && 1,
                        fontSize: "20px",
                        fontWeight: "400",
                        color: DarkFF4F(cookies),
                      }}
                    >
                      <strong>{item.subTitle}</strong>
                      {item.description}
                    </Typography>
                  </Grid>
                </>
              )}
            </React.Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};

export default memo(FeaturesInfo);
