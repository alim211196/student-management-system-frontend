import React, { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomTheme from "./CustomTheme";
import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import ModeComp from "./ModeComp";
import BeforeLoginMenuBody from "./BeforeLoginMenuBody";
import { useCookies } from "react-cookie";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import MenuIcon from "@mui/icons-material/Menu";

function CommonCode({ link, title, navigate, cookies }) {
  if (window.location.pathname === link) {
    return null;
  } else {
    return (
      <CustomTheme>
        <Button
          sx={{
            ml: 1,
            background: cookies.theme === "dark" ? "#000" : "#0063A5",
          }}
          variant="text"
          onClick={() => navigate(link)}
        >
          {title}
        </Button>
      </CustomTheme>
    );
  }
}
const Header = () => {
  const [cookies] = useCookies(["theme"]);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Diversity2Icon sx={{ fontSize: matches ? "32px" : "22px", mr: 1 }} />
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
        </Box>
        {!matches ? (
          <IconButton onClick={toggleDrawer}>
            <MenuIcon
              sx={{
                width: 24,
                height: 24,
                color: "#FFF",
              }}
            />
          </IconButton>
        ) : (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CommonCode
              link={"/"}
              title={"Home"}
              navigate={navigate}
              cookies={cookies}
            />
            <CommonCode
              link={"/login"}
              title={"Login"}
              navigate={navigate}
              cookies={cookies}
            />
            <ModeComp />
          </nav>
        )}
      </Toolbar>
      {drawerOpen && !matches && (
        <BeforeLoginMenuBody
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          cookies={cookies}
        />
      )}
    </AppBar>
  );
};

export default memo(Header);
