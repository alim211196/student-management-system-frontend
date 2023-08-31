import React, { memo } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../../../Utils/navLinks";
import ModeComp from "../../../Utils/ModeComp";
import MenuWrapper from "../../../Utils/MenuWrapper";
import {
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  ListItemButton,
  Box,
  Divider,
  ListItemAvatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DarkFF4F } from "../../../Utils/CommonCookies";
import { avatarName, extractFirstName } from "../../../Utils/AvatarName";
import { IconColor, StyledBadge } from "../../../Utils/stylingMethods";
import CustomAvatar from "../../../Utils/CustomAvatar";
const AfterLoginMenuBody = ({
  open,
  toggleDrawer,
  setUpDown,
  searchCondition,
  upDown,
  data,
  userData,
  handleNavigate,
  cookies,
}) => {
  const navigate = useNavigate();

 
  return (
    <>
      <MenuWrapper open={open} toggleDrawer={toggleDrawer} cookies={cookies}>
        <List>
          <ListItem
            onClick={() => handleNavigate()}
            disablePadding
            sx={{
              pl: 2,
              pt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
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
                {userData?.profileImage ? (
                  <CustomAvatar>
                    <Avatar alt="profile" src={userData?.profileImage} />
                  </CustomAvatar>
                ) : (
                  <CustomAvatar>
                    {avatarName(`${userData?.fullName && userData?.fullName}`)}
                  </CustomAvatar>
                )}
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              sx={{
                "& .MuiTypography-root": {
                  color: DarkFF4F(cookies),
                },
              }}
              primary={extractFirstName(
                `${userData?.fullName && userData?.fullName}`
              )}
              secondary={userData?.email}
            />
          </ListItem>

          <Divider
            sx={{
              borderColor: cookies.theme === "dark" && "#fff",
            }}
          />
          <Box sx={{ p: 1 }}>
            {searchCondition() && !upDown && data?.length > 0 && (
              <ListItem
                onClick={() => {
                  setUpDown(true);
                  toggleDrawer();
                }}
                disablePadding
              >
                <ListItemButton sx={{ borderRadius: "10px" }}>
                  <ListItemIcon>
                    <SearchIcon sx={{ color: DarkFF4F(cookies) }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Search"}
                    sx={{
                      color: DarkFF4F(cookies),
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            {navLinks
              .filter(
                (nav) =>
                  (nav.LoggedIn === true && nav.access === userData?.role) ||
                  nav.access === "both"
              )
              .map((item, index) => {
                const selected = item.path === window.location.pathname;
                return (
                  <ListItem
                    key={index}
                    onClick={() => navigate(item.path)}
                    disablePadding
                  >
                    <ListItemButton
                      selected={selected}
                      sx={{
                        borderRadius: "10px",
                        ":hover": {
                          background: cookies.theme === "dark" && "#292929",
                        },
                        "&.Mui-selected": {
                          background: "#0063a530",
                          ":hover": {
                            background: "#0063a530",
                          },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: IconColor(cookies, selected) }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          color: IconColor(cookies, selected),
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </Box>
        </List>
        <Box
          sx={
            cookies.token !== "undefined"
              ? {
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  p: 1,
                }
              : {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  p: 1,
                }
          }
        >
          <ModeComp />
        </Box>
      </MenuWrapper>
    </>
  );
};

export default memo(AfterLoginMenuBody);
