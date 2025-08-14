import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuth);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
