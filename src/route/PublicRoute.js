import { useCookies } from "react-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const [cookies] = useCookies(["token"]);
 const token = cookies?.token && cookies?.token !== "undefined";
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
