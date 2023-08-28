import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const colorFn = (cookies) => {
  if (cookies && cookies?.theme === "dark") {
    return "#000!important";
  } else {
    return "#0063A5!important";
  }
};

export const BootstrapButton = styled(Button)(({ cookies, matches }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: matches ? "16px" : "13px",
  border: !matches && "1px solid",
  background: colorFn(cookies),
  borderColor: !matches && "#fff",
  borderRadius: "5px",
  minWidth: "40px",
  marginRight: "5px",
  padding: "3px !important",
  "&:hover": {
    backgroundColor: colorFn(cookies),
    borderColor: !matches && "#fff",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: colorFn(cookies),
    borderColor: !matches && "#fff",
  },
  "&:focus": {
    boxShadow:
      cookies.theme === "dark" ? "0 0 0 0.2rem #000" : "0 0 0 0.2rem #0063A5",
  },
}));


