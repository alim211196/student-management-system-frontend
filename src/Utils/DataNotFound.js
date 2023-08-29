import { Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import CustomProgressBar from "./CustomProgressBar";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { DarkFFF } from "./CommonCookies";
const DataNotFound = () => {
  const progress = useSelector((state) => state.progressBar);
  const [cookies] = useCookies(["theme"]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {progress === true ? (
        <CustomProgressBar />
      ) : (
        <>
          {" "}
          <Info sx={{ fontSize: 60 }} />
          <Typography
            variant="h5"
            align="center"
            mt={2}
            sx={{ color: DarkFFF(cookies) }}
          >
            No data found
          </Typography>
        </>
      )}
    </Box>
  );
};

export default DataNotFound;
