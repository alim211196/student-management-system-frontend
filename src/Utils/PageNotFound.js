import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const PageNotFound = () => {
  const [cookies] = useCookies(["token"]);
  const isLoggedIn = cookies?.token !== "undefined";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", mb: 4 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <Button
        component={Link}
        to={isLoggedIn ? "/dashboard" : "/"}
        variant="contained"
        sx={{
          px: 6,
          background: "#292929",
          "&:hover": {
            backgroundColor: "#3f3f3f",
          },
        }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};
export default PageNotFound;
