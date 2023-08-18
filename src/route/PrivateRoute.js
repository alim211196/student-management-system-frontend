import { useCookies } from "react-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [cookies] = useCookies(["loggedIn"]);
  return cookies.loggedIn === "true" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
