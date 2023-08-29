import { useCookies } from "react-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token && cookies?.token !== "undefined"
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
