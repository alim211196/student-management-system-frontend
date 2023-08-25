import { Dark00, Dark00FF, DarkFFF } from "../../Utils/CommonCookies";

export const DrawerStyle = (cookies, matches, upDown, open) => {
  const path = [
    "/manage-students",
    "/manage-queries",
    "/manage-teachers",
  ].includes(window.location.pathname);

  const CommonStyle = "4rem 1rem 0rem";

  const paddingStyle = () => {
    if (!matches && upDown) {
      if (path) {
        return "8rem 1rem 0rem";
      } else {
        return CommonStyle;
      }
    } else if (!matches && !upDown) {
      return CommonStyle;
    } else if (matches) {
      if (path) {
        return CommonStyle;
      } else {
        return CommonStyle;
      }
    } else {
      return "4rem 0rem 0rem";
    }
  };

  const parentBox = {
      display: "flex",
    },
    drawerHeader1 = {
      background: cookies.theme === "dark" ? "#000" : "#FFF",
    },
    innerBox1 = {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    iconBtn = {
      marginLeft: "5px",
    },
    iconBtnAvatar = {
      width: 28,
      height: 28,
      color: cookies.theme === "dark" ? "#fff" : "#000",
    },
    dynamicList = {
      pt: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh",
      background: cookies.theme === "dark" ? "#292929" : "#fff",
      mt: 8,
      // borderRight: cookies.theme === "dark" && "1px solid #000",
    },
    dynamicListBox = {
      paddingTop: !matches && upDown ? "3rem" : 0,
    },
    dynamicListItem = {
      display: "block",
    },
    innerBox2 = {
      flexGrow: 1,
      p: paddingStyle(),
      marginTop: "1rem",
      paddingBottom: "20px",
      backgroundColor: Dark00(cookies),
      width: "100%",
      overflow: "scroll",
      overflowY: "auto",
      height: "97.9vh",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#000",
        outline: "1px solid slategrey",
      },

      "& .MuiContainer-root": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    listItemBtn = {
      minHeight: 48,
      justifyContent: open ? "initial" : "center",
      px: 2.5,
      "&.Mui-selected": {
        background: cookies.theme === "dark" ? "#000" : "#0063A5",
        ":hover": {
          background: cookies.theme === "dark" ? "#000" : "#0063A5",
        },
      },
    },
    innerAvatar = {
      minWidth: 0,
      mr: open ? 3 : "auto",
      justifyContent: "center",
      width: 30,
      height: 30,
      // color: cookies.theme === "dark" ? "#fff" : "#000",
      alignItems: "center",
      cursor: "pointer",
      transition: "transform 500ms ease",
      ":hover": {
        transform: `scale(1.3)`,
      },
    },
    listItemText = {
      opacity: open ? 1 : 0,
      pb: 0,
    },
    appBar = {
      background: cookies.theme === "dark" ? "#000" : "#0063A5",
      boxShadow: "none",
    },
    toolbarIconBtn = {
      marginRight: matches ? 5 : 1,
      marginLeft: matches ? "-13px" : "2px",
      color: "#FFF",
      ...(open && { display: "none" }),
    },
    toolbarIconBtn1 = {
      color: "#FFF",
    },
    toolbarIconBtnAvatar = {
      width: matches ? 30 : 24,
      height: matches ? 30 : 24,

      color: "#FFF",
    },
    innerBox3 = {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ml: !matches &&1,
    },
    titleTypo = {
      color: "transparent",
      fontSize: matches ? "32px" : "22px",
      fontWeight: 900,
      WebkitTextStroke: "1px #FFF",
    },
    childBox1 = {
      display: "flex",
      alignItems: "center",
    },
    searchIcon = {
      color: DarkFFF(cookies),
      fontSize: "20px",
    },
    searchToolbar = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: Dark00FF(cookies),
      padding: "1rem",
    };

  return {
    parentBox,
    drawerHeader1,
    innerBox1,
    iconBtn,
    iconBtnAvatar,
    dynamicList,
    dynamicListBox,
    dynamicListItem,
    innerBox2,
    listItemBtn,
    innerAvatar,
    listItemText,
    appBar,
    toolbarIconBtn,
    toolbarIconBtn1,
    toolbarIconBtnAvatar,
    innerBox3,
    titleTypo,
    childBox1,
    searchIcon,
    searchToolbar,
  };
};
