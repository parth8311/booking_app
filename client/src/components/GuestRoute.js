import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to="/booking" replace />;
  return children;
};

export default GuestRoute;
