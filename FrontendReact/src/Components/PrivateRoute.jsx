import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Check if user is authenticated (you can implement this logic using your authentication system)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
