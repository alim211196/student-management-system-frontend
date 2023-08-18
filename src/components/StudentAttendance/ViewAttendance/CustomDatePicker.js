import { Box, Paper, TextField, Typography } from "@mui/material";
import React, { memo } from "react";
import CustomTheme from "../../../Utils/CustomTheme";
import { Dark00FF } from "../../../Utils/CommonCookies";
const CustomDatePicker = ({
  cookies,
  setStartDate,
  startDate,
}) => {
  return (
    <CustomTheme>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: cookies.theme === "dark" ? "#fff" : "#000",
              fontSize: "20px",
              ml: 1,
            }}
          >
            Select Date:
          </Typography>
          <TextField
            sx={{ ml: 1 }}
            required
            id="date"
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            variant="outlined"
            inputProps={{
              max: "2999-12-31",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Paper>
    </CustomTheme>
  );
};

export default memo(CustomDatePicker);
