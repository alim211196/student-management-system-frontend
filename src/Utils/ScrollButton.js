import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    borderRadius: "50%",
    color: "white",
    width: "36px",
    height: "36px",
    background: "#0063A5",
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "all 0.3s ease",
    ":hover": {
      background: "#0063A5",
      color: "white",
    },
  };

  return (
    <Fab sx={buttonStyles}   onClick={scrollToTop}>
      <KeyboardArrowUpIcon />
    </Fab>
  );
}

export default ScrollButton;
