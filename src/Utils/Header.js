import React, { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomTheme from "./CustomTheme";
import { Box, useMediaQuery } from "@mui/material";
import ModeComp from "./ModeComp";
import BeforeLoginMenuBody from "./BeforeLoginMenuBody";
import { useCookies } from "react-cookie";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { BootstrapButton } from "./BootstrapButton";

function CommonCode({ link, title, cookies, navigate,matches }) {
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
          matches={matches}
        >
          {title}
        </BootstrapButton>
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
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
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
          <Box>
            <ModeComp />
            <BootstrapButton
              variant="contained"
              disableRipple
              onClick={toggleDrawer}
              cookies={cookies}
              matches={matches}
            >
              {!open ? (
                <MenuIcon
                  sx={{
                    width: 24,
                    height: 24,
                    color: "#FFF",
                  }}
                />
              ) : (
                <CloseIcon
                  sx={{
                    width: 24,
                    height: 24,
                    color: "#FFF",
                  }}
                />
              )}
            </BootstrapButton>
          </Box>
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
              cookies={cookies}
              navigate={navigate}
              matches={matches}
            />
            <CommonCode
              link={"/login"}
              title={"Login"}
              cookies={cookies}
              navigate={navigate}
              matches={matches}
            />
            <ModeComp />
          </nav>
        )}
      </Toolbar>
      {open && !matches && <BeforeLoginMenuBody isOpen={open} />}
    </AppBar>
  );
};

export default memo(Header);
