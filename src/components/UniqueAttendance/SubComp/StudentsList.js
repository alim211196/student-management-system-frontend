import React, { useState, memo } from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PaperWrapper from "../../../Utils/PaperWrapper";
import {
  Grid,
  Box,
  Avatar,
  CardContent,
  CardActionArea,
  Card,
  Typography,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { CardBorder, DarkFFF } from "../../../Utils/CommonCookies";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { useNavigate } from "react-router-dom";
import { SearchWithFuse } from "../../../Utils/SearchWithFuse";
const StudentsList = ({ cookies, data, id }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const matches = useMediaQuery("(min-width:600px)");
  const RedirectToStudentAttendance = (_id) => {
    navigate(`/view-student-attendance/${_id}`);
    localStorage.setItem("attendance_id", id);
  };

  const newResults = SearchWithFuse(["attendance", "fullName"], query, data);

  return (
    <PaperWrapper
      cookies={cookies}
      boxBGColor={"#EC407A"}
      icon={<PeopleOutlineIcon />}
      text={"Students list"}
      setQuery={setQuery}
      query={query}
      matches={matches}
      data={data}
    >
      <Grid container spacing={2} sx={{ p: 2 }}>
        {newResults?.length > 0 ? (
          newResults?.map((item, index) => {
            const topColor = item?.attendance ? "#4CAF50" : "#EF5350",
              bottomColor = item?.attendance ? "#1B5E20" : "#B71C1C";
            return (
              <Grid item keys={index} xs={12} sm={4} md={3}>
                <Card
                  sx={{
                    background: topColor,
                    border: CardBorder(cookies, bottomColor),
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
                        p: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          background: bottomColor,
                          width: 80,
                          height: 80,
                          fontSize: 36,
                        }}
                      >
                        {item?.attendance === true ? "P" : "A"}
                      </Avatar>
                    </Box>

                    <CardContent
                      sx={{
                        p: "10px",
                        background: bottomColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {item?.fullName}
                      </Typography>
                      <Tooltip
                        title={`View ${item?.fullName}'s Attendance`}
                        placement="top"
                      >
                        <IconButton
                          onClick={() => RedirectToStudentAttendance(item?._id)}
                        >
                          <ContentPasteGoIcon
                            sx={{ fontSize: 20, color: "#fff" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: DarkFFF(cookies),
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              No Data Found
            </Typography>
          </Box>
        )}
      </Grid>
    </PaperWrapper>
  );
};

export default memo(StudentsList);
