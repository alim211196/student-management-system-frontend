import { Box, CircularProgress, Grid } from "@mui/material";
import React, { memo } from "react";
import CustomCard from "./CustomCard";
import DataNotFound from "./DataNotFound";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const CardContainer = ({
  parentComp,
  handleEdit,
  handleActive,
  data,
  loading,
  handleClickOpen,
}) => {
  const [cookies] = useCookies(["theme"]);
  const { userData } = useSelector((state) => state.getUserProfile);
  const styleOnGrid = {
    display: "flex",
    height: "50vh",
    justifyContent: "center",
    alignItems: "center",
  };
  const ConditionOnGrid = () => {
    if (data?.length < 1) {
      return styleOnGrid;
    }
  };

  const isAdmin = userData?.role === "Admin";

  const filteredData = isAdmin
    ? data
    : data?.filter(
        (i) =>
          i.active === true &&
          i?.course === userData?.course &&
          i?.courseYear === userData?.courseYear
      );

  return (
    <Box sx={{ mt: 1 }}>
      {filteredData?.length > 0 ? (
        <Grid container spacing={2} sx={ConditionOnGrid}>
          {filteredData?.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CustomCard
                  parentComp={parentComp}
                  handleEdit={handleEdit}
                  item={item}
                  handleActive={handleActive}
                  cookies={cookies}
                  isAdmin={isAdmin}
                  handleClickOpen={handleClickOpen}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box sx={({ marginTop: "10px" }, styleOnGrid)}>
          {" "}
          {loading ? <CircularProgress color="inherit" /> : <DataNotFound />}
        </Box>
      )}
    </Box>
  );
};

export default memo(CardContainer);
