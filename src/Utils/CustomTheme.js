import React, { memo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import {
  Dark4F29,
  DarkFFF,
  DarkFF4F,
  Dark00,
  DarkBorder,
  DarkD4D4,
  DarkThin4f4f,
} from "./CommonCookies";

const CustomTheme = ({ children }) => {
  const [cookies] = useCookies(["theme"]);

  const path = ["/login", "/forgot-password", "/reset-password"].includes(
    window.location.pathname
  );

  const dark = cookies.theme === "dark";

  const colorCondition = () => {
    if (path) {
      return "#D3D3D3 ";
    }
    if (dark) {
      return "#D3D3D3 ";
    } else {
      return "#292929 ";
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#000",
      },
    },
    components: {
      typography: {
        fontFamily: "Roboto",
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                transition:
                  "transform 0.35s cubic-bezier(0.36, 1, 0.62, 0.98) 0.085s, opacity 0.3s ease-in-out 0.2s, background 0.15s ease-in-out, border 0.3s ease-in-out",
                opacity: 1,
                color: colorCondition(),
                fontSize: 16,
                padding: "14px 10px",
                background: "rgba(255, 255, 255, 0.25)",
                border: "1px solid",
                borderRadius: 1,
                borderColor: colorCondition(),
              },
            },
            "& .MuiOutlinedInput-root.Mui-disabled": {
              "& fieldset": {
                color: colorCondition(),
                borderColor: colorCondition(), // change border color
              },
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: colorCondition(),
            },
            "& .MuiOutlinedInput-root.Mui-disabled:hover fieldset": {
              borderColor: DarkFFF(cookies),
            },
            "& .MuiOutlinedInput-input": {
              color: path ? "#FFF !important" : DarkFF4F(cookies),
            },
            "& .MuiOutlinedInput-input.Mui-disabled": {
              WebkitTextFillColor: DarkFFF(cookies),
              opacity: 0.6,
            },
            "& .MuiInputLabel-root": {
              color: DarkFF4F(cookies),
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: DarkFF4F(cookies),
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: DarkFFF(cookies),
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                transition:
                  "transform 0.35s cubic-bezier(0.36, 1, 0.62, 0.98) 0.085s, opacity 0.3s ease-in-out 0.2s, background 0.15s ease-in-out, border 0.3s ease-in-out",
                opacity: 1,
                color: dark ? colorCondition() : "#292929!important",
                fontSize: 16,
                padding: "14px 10px",
                background: "rgba(255, 255, 255, 0.25)",
                border: "1px solid",
                borderColor: colorCondition(),
                borderRadius: 1,
              },
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: dark ? colorCondition() : "#B5B5B5",
            },
            "& .MuiOutlinedInput-input": {
              color: colorCondition(),
            },
            "& .MuiInputLabel-root": {
              color: dark ? colorCondition() : "#292929!important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: dark ? colorCondition() : "#292929!important",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            // border: "1px solid #696969!important",
            "&:hover": {
              // border: "1px solid #696969!important",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            "&.MuiPopover-paper": {
              backgroundColor: Dark00(cookies),
              color: DarkFFF(cookies),
              border: DarkBorder(cookies),
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&.MuiIconButton-root.Mui-disabled": {
              color: DarkD4D4(cookies),
              opacity: 0.6,
            },
            "&.MuiIconButton-root": {
              color: DarkD4D4(cookies),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            "&.MuiDivider-root::before": {
              borderTop: DarkThin4f4f(cookies),
            },
            "&.MuiDivider-root::after": {
              borderTop: DarkThin4f4f(cookies),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            background: Dark4F29(cookies),
            "& .MuiChip-label": {
              color: DarkFFF(cookies),
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #000",
            fontWeight: "bolder",
          },
        },
      },
      MuiLoadingButton: {
        styleOverrides: {
          root: {
            color: "#fff",
            padding: "6px 10px",
            marginBottom: 0,
            textTransform: "uppercase",
            cursor: "pointer",
            border: "none",
            background: "#000",
            borderRadius: 2,
            "&:hover": {
              background: "#000",
            },
            "&:disabled": {
              background: "#000",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#fff !important",
            padding: "6px 10px",
            marginBottom: 0,
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
            background: "#000",
            "&:hover": {
              background: "#000",
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default memo(CustomTheme);
