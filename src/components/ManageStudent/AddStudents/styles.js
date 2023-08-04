export const DashboardStyle = (matches) => {
  const MainContainer = {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    parentBox = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar = {
      width: 56,
      height: 56,
    },
    iconBtn = {
      position: "absolute",
      left: matches ? 70 : 10,
      color: "#fff",
      top: 70,
      cursor: "pointer",
      borderRadius: "50%",
      background: '#1976D2',
      "&:hover": {
        background: "#1976D2",
      },
    },
    iconBtnAvatar = {
      width: 28,
      height: 28,
    },
    innerBox = {
      mt: 3,
    };
  return {
    MainContainer,
    parentBox,
    avatar,
    iconBtn,
    iconBtnAvatar,
    innerBox,
  };
};
