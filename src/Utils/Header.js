import React, { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CustomTheme from "./CustomTheme";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useMediaQuery } from "@mui/material";
import ModeComp from "./ModeComp";
import BeforeLoginMenuBody from "./BeforeLoginMenuBody";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const BootstrapButton = styled(Button)(({ cookies }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 8px",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  color: "#FFF!important",
  borderRadius: "0px",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: cookies.theme === "dark" ? "#292929" : "#0063A5",
    color: "#fff!important",
  },
}));

const Header = () => {
  const [cookies] = useCookies(["theme"]);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
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
          <BootstrapButton
            variant="contained"
            disableRipple
            onClick={() => navigate(link)}
            cookies={cookies}
          >
            {title}
          </BootstrapButton>
        </CustomTheme>
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollingUp(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: cookies.theme === "dark" ? "#000" : "#0063A5",
        color: "#fff",
        transform: scrollingUp ? "translateY(0)" : "translateY(-100%)", // Add this line
        transition: "transform 0.3s ease-in-out", // Add this line
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            display: "inline-block",
            cursor: "pointer",
            color: "transparent",
            fontSize: matches ? "32px" : "22px",
            fontWeight: 900,
            WebkitTextStroke: "1px #FFF",
          }}
          onClick={() => navigate("/")}
        >
          StudentsTracker
        </Typography>
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
                  color: "#FFF",
                }}
              />
            </IconButton>
          </>
        ) : (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {CommonCode("/", "Home")}
            {CommonCode("/login", "Login")}
            <ModeComp />
          </nav>
        )}
      </Toolbar>
      <BeforeLoginMenuBody open={open} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export default memo(Header);
