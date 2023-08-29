import React, { useState, memo } from "react";
import { Grid, Paper, Box, Divider, Typography } from "@mui/material";
import { Settings, PowerSettingsNew } from "@mui/icons-material/";
import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "../../../Utils/stylingMethods";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItemText, List, ListItem, ListItemAvatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../Utils/DialogBox";
import { fetchData } from "../../../app/reducer/getUserProfile";
import { CardBorder, Dark00FF, DarkFFF } from "../../../Utils/CommonCookies";
const ProfileSection = ({
  removeCookie,
  cookies,
  icon,
  title,
  bgColor,
  userData,
  matches,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setDialogOpen(false);
  };
  const logoutFn = () => {
    removeCookie("token");
    dispatch(
      fetchData({
        userData: {},
      })
    );
    navigate("/");
  };

  const redirectToProfile = () => {
    if (userData?.role === "Admin") {
      navigate("/manage-profile");
    } else {
      navigate("/manage-account");
    }
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Box
          sx={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            transition: "transform 500ms ease",
            "&:hover": {
              transform: `scale(1.05)`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              background: bgColor,
              color: "#fff",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            {icon}
            <Typography>{title}</Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 0,
              height: matches ? "224px" : "100%",
              paddingBottom: "10px",
              background: Dark00FF(cookies),
              border: CardBorder(cookies, bgColor),
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "&::-webkit-scrollbar": {
                width: "2px",
                background: Dark00FF(cookies),
              },
              "&::-webkit-scrollbar-thumb": {
                background: bgColor,
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <List sx={{ pt: 0, width: "100%" }}>
              <Box sx={{ pt: 1 }}>
                <ListItem>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      lg={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemAvatar>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar
                            sx={{
                              border: `1px solid ${bgColor}`,
                              width: 60,
                              height: 60,
                            }}
                            src={userData?.profileImage}
                          />
                        </StyledBadge>
                      </ListItemAvatar>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={9}
                      lg={9}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                      {" "}
                      <Box sx={{ pl: 2, pr: 2, pt: 0, pb: 0 }}>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: DarkFFF(cookies),
                          }}
                        >
                          {userData?.fullName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: DarkFFF(cookies),
                          }}
                        >
                          {userData?.email}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: DarkFFF(cookies),
                          }}
                        >
                          {userData?.phone}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
                {matches && <Divider variant="inset" component="li" />}
              </Box>
            </List>
            <Box sx={{ padding: "12px 16px" }}>
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  background: "#0288D1",
                  mb: 1,
                  color: "#fff",
                  transition: "transform 500ms ease",
                  "&:hover": {
                    transform: `scale(1.05)`,
                    background: "#0288D1",
                    mb: 1,
                    color: "#fff",
                  },
                }}
                onClick={() => redirectToProfile()}
              >
                <ListItemIcon>
                  <Settings sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </ListItemButton>
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  background: "#00796B",
                  transition: "transform 500ms ease",
                  color: "#fff",
                  "&:hover": {
                    transform: `scale(1.05)`,
                    background: "#00796B",
                    color: "#fff",
                  },
                }}
                onClick={() => setDialogOpen(true)}
              >
                <ListItemIcon>
                  <PowerSettingsNew sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </Box>
          </Paper>
        </Box>
      </Grid>
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={logoutFn}
        text={"Are your sure you want to exit?"}
        cookies={cookies}
      />
    </>
  );
};

export default memo(ProfileSection);
