import React, { lazy, useEffect,useRef } from "react";
import Header from "../../Utils/Header";
import Footer from "../../Utils/Footer";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Contact from "../Contact";
import LinkComp from "../../Utils/LinkComp";
import { HomeStyle } from "./styles";
import CustomTheme from "../../Utils/CustomTheme";
import ScrollButton from "../../Utils/ScrollButton";
import CardList from "../Dashboard/DashboardSubComp/CardList";
import {
  School,
  SupervisedUserCircle,
  LocalLibrary,
  RecentActors,
} from "@mui/icons-material/";
const FeaturesInfo = lazy(() => import("./FeaturesInfo"));
const Home = () => {
  const contactSectionRef = useRef();
  const [cookies] = useCookies(["loggedIn", "theme"]);
    const matches = useMediaQuery("(min-width:900px)");
  const styles = HomeStyle(cookies, matches);
  useEffect(() => {
    if (window.location.path === "/" && cookies.loggedIn === "true") {
      <Navigate to="/dashboard" />;
    }
  }, [cookies.loggedIn]);

  const iconStyle = {
    width: "80px",
    height: "80px",
    color: "#fff",
  };

  return cookies.loggedIn === "true" ? (
    <Navigate to="/dashboard" />
  ) : (
    <CustomTheme>
      <Box sx={styles.parentContainer}>
        <Box sx={styles.Container}>
          <Header />
          <Box sx={styles.MainContainer}>
            <Box sx={styles.innerBox}>
              <Typography sx={styles.typo1}>
                Welcome to StudentsTracker
              </Typography>
              <Typography sx={styles.typo2}>{styles.longText}</Typography>
              <LinkComp
                text={"Already have an account? Sign in"}
                path={"/login"}
                cookies={cookies}
              />
            </Box>
          </Box>
          <Container
            maxWidth={matches ? "lg" : "md"}
            sx={{ marginTop: "-40px", zIndex: "1", position: "relative" }}
          >
            <Grid
              container
              spacing={2}
              sx={{ pr: !matches && 2, pl: !matches && 2 }}
            >
              <CardList
                topColor={"#EF5350"}
                icon={<School sx={iconStyle} />}
                quantity={"1000+"}
                bottomColor={"#B71C1C"}
                text={"Total Students"}
                cookies={cookies}
              />
              <CardList
                topColor={"#EC407A"}
                icon={<SupervisedUserCircle sx={iconStyle} />}
                quantity={"200+"}
                bottomColor={"#880E4F"}
                text={"Total Teachers"}
                cookies={cookies}
              />
              <CardList
                topColor={"#AB47BC"}
                icon={<LocalLibrary sx={iconStyle} />}
                quantity={"8+"}
                bottomColor={"#4A148C"}
                text={"Total Courses"}
                cookies={cookies}
              />
              <CardList
                topColor={"#4CAF50"}
                icon={<RecentActors sx={iconStyle} />}
                quantity={"22+"}
                bottomColor={"#1B5E20"}
                text={"Total Batches"}
                cookies={cookies}
              />
            </Grid>
          </Container>
        </Box>
        <FeaturesInfo  matches={matches} cookies={cookies} />
        <section ref={contactSectionRef} id="contact-form-section">
          {" "}
          <Contact Home={true} cookies={cookies} />
        </section>

        <Footer 
          scrollToContact={() =>
            contactSectionRef.current.scrollIntoView({ behavior: "smooth" })
          }
          cookies={cookies}
          matches={matches}
        />
      </Box>
      <ScrollButton />
    </CustomTheme>
  );
};

export default Home;
