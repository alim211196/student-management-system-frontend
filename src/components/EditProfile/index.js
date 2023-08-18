import { Container, CssBaseline } from "@mui/material";
import React from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import ChangePassword from "./EditProfileSubComponent/PasswordIndex";
import ChangeProfile from "./EditProfileSubComponent/ChangeProfile";
import { useCookies } from "react-cookie";
import { ProfileStyle } from "./styles";
import TitleBox from "../../Utils/TitleBox";
import {ManageAccounts, AccountCircle, LockReset } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../../Utils/TabPanel";
import { ContainerStyle } from "../../Utils/stylingMethods";

const EditProfile = () => {
  const [cookies] = useCookies(["theme", "UserId"]);
  const styles = ProfileStyle(cookies);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomTheme>
      <MiniDrawer>
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={
              <ManageAccounts
                sx={{ color: cookies.theme === "dark" ? "#fff" : "#000" }}
              />
            }
            text={"Manage Account"}
          />
          <Box sx={{ width: "100%", mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <AccountCircle />
                      <Typography sx={{ ml: 1 }}>Change Profile</Typography>
                    </Box>
                  }
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#000",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #000",
                      borderRadius: "5px",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <LockReset />
                      <Typography sx={{ ml: 1 }}>Change Password</Typography>
                    </Box>
                  }
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "capitalize",
                    color: cookies.theme === "dark" && "#fff",
                    "&.Mui-selected": {
                      color: cookies.theme === "dark" ? "#fff" : "#000",
                      background: cookies.theme === "dark" && "#292929",
                      border: cookies.theme === "dark" && "1px solid #000",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} sx={{ p: 0 }}>
              <ChangeProfile styles={styles} cookies={cookies} />
            </TabPanel>
            <TabPanel value={value} index={1} sx={{ p: 0 }}>
              <ChangePassword styles={styles} cookies={cookies} />
            </TabPanel>
          </Box>
        </Container>
      </MiniDrawer>
    </CustomTheme>
  );
};

export default EditProfile;
