import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import { DiGhost } from "react-icons/di";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  // console.log(location);

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
