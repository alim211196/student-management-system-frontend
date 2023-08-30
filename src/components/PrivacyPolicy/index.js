import React from "react";
import Typography from "@mui/material/Typography";
import CustomTheme from "../../Utils/CustomTheme";
import Header from "../../Utils/Header";
import { Box, useMediaQuery } from "@mui/material";
import { useCookies } from "react-cookie";
import Footer from "../../Utils/Footer";
import { Divider } from "@mui/material";

const PrivacyPolicy = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [cookies] = useCookies(["theme"]);

  const title = {
    color: "transparent",
    fontSize: matches ? "32px" : "22px",
    fontWeight: 900,
    WebkitTextStroke: cookies.theme === "dark" ? "1px #FFF" : "1px #292929",
  };
  return (
    <CustomTheme>
      <Header />
      <Box
        sx={{
          transition: "all .85s ease-in-out",
          padding: matches ? "80px 20px 10px" : "80px 10px 10px",
          background: cookies.theme === "dark" ? "#292929" : "#FFF",
          color: cookies.theme === "dark" ? "#FFF" : "#292929",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Privacy Policy
        </Typography>
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="left">
            <Typography variant="h4" paragraph sx={title}>
              Welcome to StudentsTracker
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            This website is designed to provide an easy and efficient way for
            students, teachers, and administrators to manage student
            information, including course schedules, grades, attendance records,
            and more. With a user-friendly interface and powerful tools, this
            system is designed to simplify and streamline the process of
            managing student data, allowing you to focus on what really matters:
            providing the best possible education for your students. Whether you
            are a teacher, administrator, or student, this website has
            everything you need to stay organized and on track.
          </Typography>
          <Typography variant="h6" paragraph>
            Your privacy is important to us. This Privacy Policy is meant to
            help you understand what data we collect, why we collect it, and how
            we protect it.
          </Typography>
        </Box>
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="right">
            <Typography variant="h4" gutterBottom sx={title}>
              Information We Collect
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            We collect the following types of information:
          </Typography>
          <Typography variant="h6" component="ul">
            <li>
              Personal Information: We may collect personal information such as
              your name, email address, and contact details when you register or
              use our services.
            </li>
            <li>
              Academic Data: We collect academic data, including course
              schedules, grades, and attendance records, to provide educational
              services.
            </li>
            <li>
              Usage Data: We may collect information about your interactions
              with our website, including pages visited and actions taken.
            </li>
          </Typography>
        </Box>{" "}
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="left">
            <Typography variant="h4" gutterBottom sx={title}>
              How We Use Your Information
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            We use the information we collect for various purposes, including
            but not limited to:
          </Typography>
          <Typography variant="h6" component="ul">
            <li>
              Providing Services: We use your information to provide educational
              services, manage accounts, and facilitate communication.
            </li>
            <li>
              Improving Services: We analyze usage data to improve our website's
              functionality and user experience.
            </li>
            <li>
              Security: We implement security measures to protect your data and
              ensure the integrity of our services.
            </li>
          </Typography>
        </Box>
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="right">
            <Typography variant="h4" gutterBottom sx={title}>
              Data Security
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            We take data security seriously. We implement industry-standard
            security measures to protect your data from unauthorized access,
            disclosure, alteration, and destruction.
          </Typography>
        </Box>
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="left">
            <Typography variant="h4" gutterBottom sx={title}>
              Your Rights
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            You have the right to:
          </Typography>
          <Typography variant="h6" component="ul">
            <li>
              Access Your Data: You can request access to your personal
              information and data.
            </li>
            <li>
              Rectify Data: You can request corrections to inaccurate or
              incomplete data.
            </li>
            <li>
              Withdraw Consent: You can withdraw your consent for data
              processing.
            </li>
            <li>
              Data Portability: You can request a copy of your data in a
              structured format.
            </li>
            <li>
              Deletion: You can request the deletion of your data under certain
              circumstances.
            </li>
          </Typography>
        </Box>{" "}
        <Box sx={{ pt: 1, pb: 1 }}>
          <Divider textAlign="right">
            <Typography variant="h4" gutterBottom sx={title}>
              Contact Information
            </Typography>
          </Divider>
          <Typography variant="h6" paragraph>
            If you have any questions or concerns about our Privacy Policy or
            data practices, please contact us at:
          </Typography>
          <Typography variant="h6">
            Email: alim.mohammad@oxcytech.com
          </Typography>
        </Box>
      </Box>
      <Footer cookies={cookies} matches={matches} />
    </CustomTheme>
  );
};

export default PrivacyPolicy;
