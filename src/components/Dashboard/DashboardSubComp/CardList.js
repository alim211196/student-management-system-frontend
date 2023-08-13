import React, { memo } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import { CardBorder } from "../../../Utils/CommonCookies";
const CardList = ({
  cookies,
  topColor,
  icon,
  quantity,
  bottomColor,
  text,
  loading
}) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Card
        sx={{
          background: topColor,
          border: CardBorder(cookies, bottomColor),
          transition: "transform 500ms ease",
          "&:hover": {
           transform: `scale(1.05)`
          },
        }}
        elevation={0}
      >
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              padding: "20px",
            }}
          >
            {icon}
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Typography sx={{ fontSize: "30px", color: "#fff" }}>
                {quantity}
              </Typography>
            )}
          </Box>
          <CardContent sx={{ p: "10px", background: bottomColor }}>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default memo(CardList);
