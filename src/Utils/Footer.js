import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import React, { memo } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { styled } from "@mui/material/styles";
import { animateScroll as scroll } from "react-scroll";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
const BootstrapButton = styled(Button)(({ cookies, matches }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: matches ? "16px" : "13px",
  marginBottom: "4px",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  width: "60%",
  display: "flex",
  justifyContent: "start",
  color: "#FFF!important",
  borderRadius: "0px",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#292929",
    color: "#fff!important",
  },
}));
const Footer = ({ cookies, matches, scrollToContact }) => {
  const navigate = useNavigate();
  const scrollOptions = {
    duration: 500, // Duration of the scroll animation in milliseconds
    offset: -window.innerHeight / 8, // Scroll to the middle of the screen
    smooth: true, // Enable smooth scrolling
  };
  const IsHome = window.location.pathname !== "/privacy-policy";
  return (
    <>
      <Box
        sx={{
          background: "#0C0D15",
          p: "20px 30px",
          mt: IsHome ? 3 : 0,
          zIndex: 0,
          position: "relative",
        }}
        component="footer"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Diversity2Icon
                sx={{
                  fontSize: matches ? "32px" : "22px",
                  mr: 1,
                  color: "#fff",
                }}
              />
              <Typography
                sx={{
                  display: "inline-block",
                  cursor: "pointer",
                  color: "transparent",
                  fontSize: matches ? "32px" : "22px",
                  fontWeight: 900,
                  WebkitTextStroke: "1px #FFF",
                }}
                onClick={() => navigate("/")}
              >
                StudentsTracker
              </Typography>
            </Box>

            <Typography
              sx={{
                ml: !matches && 1,
                fontSize: matches ? "16px" : "13px",
                color: "#fff",
              }}
            >
              This website is designed to provide an easy and efficient way for
              students, teachers, and administrators to manage student
              information, including course schedules, grades, attendance
              records, and more. With a user-friendly interface and powerful
              tools, this system is designed to simplify and streamline the
              process of managing student data, allowing you to focus on what
              really matters: providing the best possible education for your
              students. Whether you are a teacher, administrator, or student,
              this website has everything you need to stay organized and on
              track.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{
                cursor: "pointer",
                color: "#FFF",
                fontSize: matches ? "28px" : "22px",
                fontWeight: 500,
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                pt: 2,
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <BootstrapButton
                variant="contained"
                disableRipple
                onClick={() => {
                  !IsHome && navigate("/");
                }}
                cookies={cookies}
                matches={matches}
              >
                {IsHome ? (
                  <Link
                    smooth={true}
                    duration={500}
                    onClick={() => scroll.scrollToTop()}
                  >
                    Home
                  </Link>
                ) : (
                  <>Home</>
                )}
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                disableRipple
                onClick={() => navigate("/login")}
                cookies={cookies}
                matches={matches}
              >
                Login
              </BootstrapButton>
              <BootstrapButton
                variant="contained"
                disableRipple
                onClick={() => navigate("/forgot-password")}
                cookies={cookies}
                matches={matches}
              >
                Forgot Password
              </BootstrapButton>
              {IsHome && (
                <>
                  <BootstrapButton
                    variant="contained"
                    disableRipple
                    cookies={cookies}
                    matches={matches}
                  >
                    <Link
                      to="contact-link"
                      {...scrollOptions}
                      onClick={() => scrollToContact()}
                    >
                      Contact
                    </Link>
                  </BootstrapButton>
                  <BootstrapButton
                    variant="contained"
                    disableRipple
                    onClick={() => navigate("/privacy-policy")}
                    cookies={cookies}
                    matches={matches}
                  >
                    Privacy Policy
                  </BootstrapButton>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{
                cursor: "pointer",
                color: "#FFF",
                fontSize: matches ? "28px" : "22px",
                fontWeight: 500,
              }}
            >
              Contacts
            </Typography>
            <Box>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: matches ? "18px" : "15px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                Location
              </Typography>
              <Typography
                sx={{
                  fontSize: matches ? "14px" : "12px",
                  color: "#fff",
                  mb: 1,
                }}
              >
                Oxcytech System Pvt Ltd <br />
                Pune, Maharashtra, India
              </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: matches ? "18px" : "15px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  fontSize: matches ? "14px" : "12px",
                  color: "#fff",
                  mb: 1,
                }}
              >
                alim.mohd@oxcytech.com
              </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: matches ? "18px" : "15px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                Phone
              </Typography>
              <Typography
                sx={{
                  fontSize: matches ? "14px" : "12px",
                  color: "#fff",
                  mb: 1,
                }}
              >
                +918180036208
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <Avatar
                sx={{ ml: 1, background: "#292929", cursor: "pointer" }}
                onClick={() =>
                  window.location.replace("https://github.com/alim211196")
                }
              >
                <GitHubIcon />
              </Avatar>
              <Avatar
                sx={{ ml: 1, background: "#0072b1", cursor: "pointer" }}
                onClick={() =>
                  window.location.replace(
                    "https://www.linkedin.com/in/alim-mohammad-7169691a3"
                  )
                }
              >
                <LinkedInIcon />
              </Avatar>
              <Avatar sx={{ ml: 1, background: "#00A4EF", cursor: "pointer" }}>
                <TwitterIcon />
              </Avatar>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          background: "#090A10",
          p: "20px 30px",
          zIndex: 0,
          position: "relative",
        }}
        component="footer"
      >
        <Typography
          sx={{
            ml: !matches && 1,
            fontSize: matches ? "14px" : "12px",
            color: "#777777",
          }}
        >
          Copyright 2023- StudentsTracker a product of Oxcytech System Pvt Ltd.
        </Typography>
      </Box>
    </>
  );
};

export default memo(Footer);
