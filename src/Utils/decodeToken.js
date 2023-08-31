import jwt_decode from "jwt-decode";

export const decodeToken = (cookies) => {
  let decoded = null;

  if (cookies?.token && cookies?.token !== "undefined") {
    try {
      decoded = jwt_decode(cookies.token);
    } catch (error) {
      //  navigate("/");
    }
  }
  return decoded;
};
