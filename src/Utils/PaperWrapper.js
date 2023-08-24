import { Paper, Typography, Box, Grid } from "@mui/material";
import { CardBorder, Dark00FF } from "./CommonCookies";
import React, { memo } from "react";
import SearchAppBar from "./SearchAppBar";

const PaperWrapper = ({
  children,
  cookies,
  boxBGColor,
  icon,
  text,
  setQuery,
  query,
  matches,
  data,
}) => {
  const MarginBottom = () => {
    if (
      ["/manage-departments", "/manage-queries"].includes(
        window.location.pathname
      )
    ) {
      return 0;
    } else {
      return 3;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mb: MarginBottom(),
        background: Dark00FF(cookies),
        border: CardBorder(cookies, boxBGColor),
        padding: "0px !important",
        mt: text ? 0 : 1,
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          background: boxBGColor,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={9}
          md={9}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            {" "}
            {icon}
            <Typography sx={{ fontSize: 18, fontWeight: "bold", ml: 1 }}>
              {text}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            justifyContent: matches ? "end" : "center",
          }}
        >
          {text === "Students list" && data?.length > 0 && (
            <SearchAppBar
              setQuery={setQuery}
              query={query}
              cookies={cookies}
              matches={matches}
            />
          )}
        </Grid>
      </Grid>
      {children}
    </Paper>
  );
};

export default memo(PaperWrapper);
