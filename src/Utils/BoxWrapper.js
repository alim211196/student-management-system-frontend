import React, { memo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomTheme from "./CustomTheme";
import Header from "./Header";
import { Grid, Paper, Typography } from "@mui/material";
import LinkComp from "./LinkComp";
const BoxWrapper = ({
  cookies,
  text,
  handleSubmit,
  children,
  linkText,
  path,
  maxWidth,
}) => {
  return (
    <CustomTheme>
      <Header />
      <Box
        sx={{
          // height: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `url(https://source.unsplash.com/random/?city,evening)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.92,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            transition: "all .85s ease-in-out",
            opacity: 0.92,
            backgroundColor: "#000",
          }}
        >
          <Container component="main" maxWidth={maxWidth} sx={{ pl: 1, pr: 1 }}>
            <CssBaseline />
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px 16px",
                boxShadow: "0px 0px 16px 9px rgba(0, 0, 0, 0.07)",
                background: "rgba(255, 255, 255, .13)",
                opacity: 1,
                transition: "transform 500ms ease",
                "&:hover": {
                  transform: `scale(1.05)`,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {text}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: 3,
                  width: "-webkit-fill-available",
                }}
              >
                {children}
              </Box>
                <Grid container maxWidth="xs" justifyContent={"center"}>
                  <Grid item>
                    <LinkComp text={linkText} path={path} cookies={cookies} />
                  </Grid>
                </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </CustomTheme>
  );
};

export default memo(BoxWrapper);
