import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CustomTheme from "./CustomTheme";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useMediaQuery } from "@mui/material";
import ModeComp from "./ModeComp";
import BeforeLoginMenuBody from "./BeforeLoginMenuBody";
import { useCookies } from "react-cookie";
const Header = () => {
  const [cookies] = useCookies(["theme"]);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const CommonCode = (link, title) => {
    if (window.location.pathname === link) {
      return null;
    } else {
      return (
        <CustomTheme>
          <Link
            variant="button"
            color="text.primary"
            onClick={() => navigate(link)}
            sx={{
              fontSize:'14px',
              cursor: "pointer",
              textTransform: "capitalize",
              padding: "5px",
              textDecoration: "none",
              width: "100%",
              textAlign: "center",
              color: "#fff",
              "&:hover": {
                background: !matches && "#2C497F",
                color: !matches && "#fff",
              },
            }}
          >
            {title}
          </Link>
        </CustomTheme>
      );
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        background: cookies.theme === "dark" ? "#000" : "#2C497F",
        color: "#fff",
      }}
      elevation={0}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          noWrap
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontSize: matches ? "24px" : "20px",
            color: "#fff",
          }}
          onClick={() => {
            window.location.pathname !== "/admin/sign_in" && navigate("/");
          }}
        >
          StudentsTracker
        </Typography>
        {window.location.pathname === "/admin/sign_in" ? (
          <ModeComp />
        ) : (
          <>
            {!matches ? (
              <>
                <IconButton
                  aria-label="menu"
                  onClick={toggleDrawer}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <WidgetsIcon
                    sx={{
                      width: 24,
                      height: 24,
                      color: "#fff",
                    }}
                  />
                </IconButton>
              </>
            ) : (
              <nav>
                {CommonCode("/", "Home")}
                {CommonCode("/sign_in", "Sign in")}
                <ModeComp />
              </nav>
            )}
          </>
        )}
      </Toolbar>
      <BeforeLoginMenuBody open={open} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export default memo(Header);
