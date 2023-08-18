import { DarkFFF } from "../../Utils/CommonCookies";

export const ProfileStyle = (cookies) => {
  const parentContainer = {
      paddingBottom: "10px",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    editProfileBtn = {
      marginTop: "10px",
      background: "#000",
      width: "100%",
      textTransform: "capitalize",
    },
    parentBox = {
      padding: "1rem 0rem",
    },
    childBox = {
      width: "100%",
    },
    subChildBox1 = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    subChildBox2 = {
      mt: 1,
    },
    editProfileAvatar = {
      width: 80,
      height: 80,
      borderRadius: "50%",
      boxShadow: "0px 0px 10px 1px #f0f0f0",
    },
    imageIcon = {
      fontSize: "20px",
    },
    hiddenText = {
      color: DarkFFF(cookies),
    };
  return {
    parentContainer,
    editProfileBtn,
    parentBox,
    childBox,
    subChildBox1,
    subChildBox2,
    editProfileAvatar,
    imageIcon,
    hiddenText,
  };
};
