import { Box, Container, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import { DarkFF4F } from "../../Utils/CommonCookies";
import { FeatureDescription } from "./FeatureDescription";
import { useInView } from "react-intersection-observer";

function ImageGrid({ image, matches, cookies }) {
    const [ref, inView] = useInView({
      triggerOnce: true, // Animation occurs only once when entering the viewport
      threshold: 0.2, // Adjust this threshold as needed
    });
     const styles = {
       base: {
         opacity: 0,
         transform: "translateY(20px)",
         transition: "opacity 1s ease, transform 1s ease", // Slow transition
       },
       active: {
         opacity: 1,
         transform: "translateY(0)",
       },
     };
  return (
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
      <div
        ref={ref}
        style={{
          ...styles.base,
          ...(inView ? styles.active : {}),
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundSize: "cover !important",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            background: `url(${image})`,
            transition: "transform 500ms ease",
            "&:hover": {
              transform: `scale(1.05)`,
              filter: `drop-shadow(10px 10px 20px ${
                cookies.theme === "dark" ? "#FFF" : "#000"
              })`,
            },
            width: "360px",
            height: "240px",
          }}
        />
      </div>
    </Grid>
  );
}

function TextGrid({ item, matches, cookies }) {
  return (
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
          WebkitTextStroke: `1px ${cookies.theme === "dark" ? "#FFF" : "#000"}`,
          fontSize: matches ? "28px" : "20px",
        }}
      >
        {item.title}
      </Typography>
      <Typography
        sx={{
          ml: !matches && 1,
          fontSize: matches ? "20px" : "16px",
          fontWeight: "400",
          color: DarkFF4F(cookies),
        }}
      >
        <strong>{item.subTitle}</strong>
        {item.description}
      </Typography>
    </Grid>
  );
}

const FeaturesInfo = ({ matches, cookies }) => {

 

  return (
    <Container
      maxWidth={matches ? "lg" : "md"}
      sx={{ mt: 5, mb: 2, zIndex: "1", position: "relative" }}
    >
      <Grid container spacing={2} >
        {FeatureDescription.map((item, index) => {
          return (
            <React.Fragment key={index} >
              {matches && item.position === "right" ? (
                <>
                  <TextGrid item={item} matches={matches} cookies={cookies} />
                  <ImageGrid
                    image={item?.image}
                    matches={matches}
                    cookies={cookies}
                  />
                </>
              ) : (
                <>
                  <ImageGrid
                    image={item?.image}
                    matches={matches}
                    cookies={cookies}
                  />
                  <TextGrid item={item} matches={matches} cookies={cookies} />
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
