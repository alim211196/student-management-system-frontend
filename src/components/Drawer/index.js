import React, { memo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
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
import { useMediaQuery } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GET_USER } from "../../ApiFunctions/users";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { DrawerStyle } from "./styles";
import CustomTheme from "../../Utils/CustomTheme";
import { openSnackbar } from "../../app/reducer/Snackbar";
const MiniDrawer = ({ children, setQuery, query, data, value }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.getUserProfile);
  const matches = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cookies, removeCookie] = useCookies([
    "loggedIn",
    "UserId",
    "UserType",
    "theme",
  ]);
  const [loading, setLoading] = useState(true);
  const [upDown, setUpDown] = useState(false);
  const navigate = useNavigate();
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
    const pastDate = new Date(0);
    removeCookie("loggedIn", { expires: pastDate });
    removeCookie("UserId", { expires: pastDate });
    removeCookie("UserType", { expires: pastDate });
    dispatch(
      fetchData({
        userData: {},
      })
    );
    navigate("/");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        openSnackbar({
          message: "Your session is Expired please login again.",
          severity: "error",
        })
      );
      const pastDate = new Date(0);
      removeCookie("loggedIn", { expires: pastDate });
      removeCookie("UserId", { expires: pastDate });
      removeCookie("UserType", { expires: pastDate });
      dispatch(
        fetchData({
          userData: {},
        })
      );
      navigate("/");
    }, 3600000); // 1 hour in milliseconds

    return () => clearTimeout(timeout);
  }, [dispatch, navigate, removeCookie]);

  useEffect(() => {
    if (!userData?._id) {
      setLoading(true);
      GET_USER(cookies?.UserId)
        .then((response) => {
          setLoading(false);
          dispatch(
            fetchData({
              userData: response?.data,
            })
          );
        })
        .catch((err) => {
          if (err?.status === 404) {
            const pastDate = new Date(0);
            removeCookie("loggedIn", { expires: pastDate });
            removeCookie("UserId", { expires: pastDate });
            removeCookie("UserType", { expires: pastDate });
            dispatch(
              fetchData({
                userData: {},
              })
            );
            navigate("/");
          }
          setLoading(false);
          errorHandler(err?.status, err?.data, dispatch);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, cookies.UserId, userData, navigate, removeCookie]);

  useEffect(() => {
    if (matches) {
      setUpDown(false);
    }
    if (!matches) {
      setOpen(false);
    }
  }, [matches]);

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
                  <IconButton
                    onClick={() => {
                      open ? handleDrawerClose() : handleDrawerOpen();
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
                  </IconButton>
                </Box>
              </ListItem>

              {navLinks
                .filter(
                  (nav) =>
                    (nav.LoggedIn === true && nav.access === userData.role) ||
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
                })}
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
      </Box>
    </CustomTheme>
  );
};
export default memo(MiniDrawer);
