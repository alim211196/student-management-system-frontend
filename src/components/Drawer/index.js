import React, { memo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Utils/DialogBox";
import { useCookies } from "react-cookie";
import { Drawer } from "../../Utils/stylingMethods";
import { navLinks } from "../../Utils/navLinks";
import CustomListItem from "./DrawerSubComponents/CustomListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../app/reducer/getUserProfile";
import LowerIcons from "./DrawerSubComponents/LowerIcons";
import DrawerAppBar from "./DrawerSubComponents/DrawerAppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, Divider, LinearProgress, useMediaQuery } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GET_USER, REFRESH_TOKEN } from "../../ApiFunctions/users";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { DrawerStyle } from "./styles";
import CustomTheme from "../../Utils/CustomTheme";

import SessionDailog from "../../Utils/SessionDailog";
import { decodeToken } from "../../Utils/decodeToken";
const MiniDrawer = ({ children, setQuery, query, data, value }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.getUserProfile);
  const matches = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "theme"]);
  const [loading, setLoading] = useState(true);
  const [upDown, setUpDown] = useState(false);
  const navigate = useNavigate();
  const decodedToken = decodeToken(cookies);
  const styles = DrawerStyle(cookies, matches, upDown, open);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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

  useEffect(() => {
    if (!userData?._id) {
      setLoading(true);

      GET_USER(decodedToken?._id, cookies?.token)
        .then((response) => {
          setLoading(false);
          dispatch(
            fetchData({
              userData: response?.data,
            })
          );
        })
        .catch((err) => {
          setLoading(false);
          errorHandler(err?.status, err?.data, dispatch);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, cookies, decodedToken?._id, navigate, userData]);

  useEffect(() => {
    if (matches) {
      setUpDown(false);
    }
    if (!matches) {
      setOpen(false);
    }
  }, [matches]);

  // -------------------session functionality----------------
  const [openSessionDialog, setOpenSessionDialog] = useState(false);
  useEffect(() => {
    let timer;

    const checkTokenExpiration = () => {
      // Calculate the remaining time until token expiration
      const currentTime = Date.now();
      const tokenExpiration = new Date(decodedToken?.exp * 1000);
      const timeUntilExpiration = tokenExpiration - currentTime;

      if (timeUntilExpiration <= 0) {
        removeCookie("token");
        clearInterval(timer); // Stop checking when token expires
      } else {
        // Show the popup 1 minute before token expiration
        if (timeUntilExpiration > 5 * 60 * 1000) {
          // Only set a timer if more than 1 minute is remaining
          timer = setTimeout(() => {
            setOpenSessionDialog(true);
          }, timeUntilExpiration - 5 * 60 * 1000);
        }
      }
    };

    // Initial check
    checkTokenExpiration();

    // Set up periodic checks (e.g., every minute)
    const interval = setInterval(checkTokenExpiration, 60 * 1000);

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [removeCookie, decodedToken?.exp]);

  const handleContinue = () => {
    REFRESH_TOKEN(cookies?.token)
      .then((res) => {
        const newToken = res?.data?.token;
        setCookie("token", newToken, { path: "/" });
        setOpenSessionDialog(false);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  // -------------------session functionality----------------
  return (
    <CustomTheme>
      <Box sx={styles.parentBox}>
        <CssBaseline />
        <DrawerAppBar
          setQuery={setQuery}
          query={query}
          data={data}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          loading={loading}
          userData={userData}
          navigate={navigate}
          upDown={upDown}
          setUpDown={setUpDown}
          styles={styles}
          matches={matches}
          logoutFn={logoutFn}
          dialogOpen={dialogOpen}
          DialogClose={handleClose}
          setDialogOpen={setDialogOpen}
          cookies={cookies}
          value={value}
        />
        <Drawer
          variant="permanent"
          open={open}
          sx={{ display: !matches && "none" }}
        >
          <List sx={styles.dynamicList}>
            <Box sx={styles.dynamicListBox}>
              <ListItem disablePadding sx={styles.dynamicListItem}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: open ? "end" : "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      open ? handleDrawerClose() : handleDrawerOpen();
                    }}
                    sx={{
                      background: cookies.theme === "dark" ? "#000" : "#fff",
                      boxShadow:
                        cookies.theme === "dark"
                          ? "0px 0px 2px #292929"
                          : "0px 0px 2px #0063A5",
                      minWidth: "24px!important",
                      height: "24px",
                      margin: "4px",
                      "&:hover": {
                        background: cookies.theme === "dark" ? "#000" : "#fff",
                        color: cookies.theme === "dark" ? "#FFF" : "#1976d2",
                      },
                    }}
                  >
                    {open ? (
                      <ChevronLeftIcon
                        sx={{
                          color: cookies.theme === "dark" ? "#FFF" : "#1976d2",
                        }}
                      />
                    ) : (
                      <ChevronRightIcon
                        sx={{
                          color: cookies.theme === "dark" ? "#FFF" : "#1976d2",
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </ListItem>
              <Divider
                sx={{
                  mt: 1,
                  mb: 1,
                  borderColor: cookies.theme === "dark" && "#bdbdbd",
                }}
              />
              <Box sx={{ padding: open && "0px 10px" }}>
                {userData?.role ? (
                  navLinks
                    .filter(
                      (nav) =>
                        (nav.LoggedIn === true &&
                          nav.access === userData?.role) ||
                        nav.access === "both"
                    )
                    .map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={styles.dynamicListItem}
                        >
                          <CustomListItem
                            item={item}
                            open={open}
                            styles={styles}
                            cookies={cookies}
                          />
                        </ListItem>
                      );
                    })
                ) : (
                  <LinearProgress
                    sx={{
                      height: "10px",
                      width: "100%",
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    }}
                  />
                )}
              </Box>
            </Box>
            <LowerIcons
              icon={<PowerSettingsNewIcon />}
              text={"Logout"}
              altText={"logout"}
              open={open}
              setDialogOpen={setDialogOpen}
              styles={styles}
              cookies={cookies}
            />
          </List>
        </Drawer>
        <Box component="main" sx={styles.innerBox2}>
          {children}
        </Box>
        <DialogBox
          open={dialogOpen}
          handleClose={handleClose}
          handleChange={logoutFn}
          text={"Are your sure you want to exit?"}
        />
        <SessionDailog
          open={openSessionDialog}
          handleLogout={logoutFn}
          handleContinue={handleContinue}
        />
      </Box>
    </CustomTheme>
  );
};
export default memo(MiniDrawer);
