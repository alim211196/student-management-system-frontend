import React, { memo, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import { AppBar, StyledBadge } from "../../../Utils/stylingMethods.js";
import { avatarName } from "../../../Utils/AvatarName";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAvatar from "../../../Utils/CustomAvatar";
import SearchAppBar from "../../../Utils/SearchAppBar";
import ClearIcon from "@mui/icons-material/Clear";
import AfterLoginMenuBody from "./AfterLoginMenuBody";
import ModeComp from "../../../Utils/ModeComp.js";
import DialogBox from "../../../Utils/DialogBox.js";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
const DrawerAppBar = ({
  open,
  handleDrawerOpen,
  loading,
  userData,
  navigate,
  query,
  setQuery,
  setUpDown,
  upDown,
  data,
  styles,
  matches,
  icon,
  logoutFn,
  dialogOpen,
  DialogClose,
  setDialogOpen,
  cookies,
  value,
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const searchCondition = () => {
    if (
      [
        "/manage-students",
        "/manage-queries",
        "/manage-teachers",
        "/manage-students-account",
      ].includes(window.location.pathname)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNavigate = () => {
   if (cookies?.UserType === "Admin") {
     navigate("/manage-profile");
   } else {
     navigate("/manage-account");
   }
  };
  const removeSearch = () => {
    setUpDown(false);
    setQuery("");
  };

    useEffect(() => {
      if (matches) {
       setDrawerOpen(false);
      }
    }, [matches]);

  return (
    <>
      <AppBar position="fixed" open={open} sx={styles.appBar}>
        <Toolbar sx={{ padding: !matches && "0px 6px" }}>
          <IconButton
            aria-label="open drawer"
            onClick={matches ? handleDrawerOpen : toggleDrawer}
            edge="start"
            sx={styles.toolbarIconBtn}
          >
            <MenuIcon sx={styles.toolbarIconBtnAvatar} />
          </IconButton>

          <Box sx={styles.innerBox3}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={styles.titleTypo}
            >
              StudentsTracker
            </Typography>
            <Box sx={styles.childBox1}>
              {matches &&
                searchCondition() &&
                data?.length > 0 &&
                value === 1 && (
                  <SearchAppBar
                    setQuery={setQuery}
                    query={query}
                    cookies={cookies}
                    matches={matches.toString()}
                  />
                )}
              {matches && (
                <Tooltip
                  title={`${userData?.fullName && userData?.fullName}`}
                  placement="bottom"
                >
                  <IconButton onClick={() => handleNavigate()}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      {userData?.profileImage ? (
                        <CustomAvatar>
                          {" "}
                          <Avatar alt="profile" src={userData?.profileImage} />
                        </CustomAvatar>
                      ) : (
                        <CustomAvatar>
                          {loading ? (
                            <CircularProgress color="inherit" />
                          ) : (
                            <>
                              {avatarName(
                                `${userData?.fullName && userData?.fullName}`
                              )}
                            </>
                          )}
                        </CustomAvatar>
                      )}
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              )}
              {matches && <ModeComp />}
              {!matches && (
                <IconButton
                  sx={styles.toolbarIconBtn1}
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  <PowerSettingsNewIcon sx={styles.toolbarIconBtnAvatar} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
        {!matches && upDown && data?.length > 0 && value === 1 && (
          <Box sx={styles.searchToolbar}>
            {searchCondition() && (
              <SearchAppBar
                setQuery={setQuery}
                query={query}
                matches={matches}
                cookies={cookies}
              />
            )}
            <Tooltip title="Close search" placement="bottom">
              <IconButton onClick={() => removeSearch()}>
                <ClearIcon sx={styles.searchIcon} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <AfterLoginMenuBody
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          icon={icon}
          logoutFn={logoutFn}
          dialogOpen={dialogOpen}
          DialogClose={DialogClose}
          setDialogOpen={setDialogOpen}
          setUpDown={setUpDown}
          searchCondition={searchCondition}
          upDown={upDown}
          data={data}
          userData={userData}
          handleNavigate={handleNavigate}
          cookies={cookies}
        />
      </AppBar>
      <DialogBox
        open={dialogOpen}
        handleClose={DialogClose}
        handleChange={logoutFn}
        text={"Are your sure you want to exit?"}
      />
    </>
  );
};

export default memo(DrawerAppBar);
