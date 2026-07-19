import { useContext } from "react";
import { userDataContext } from "../context/userContextAll";
import { Navigate, Outlet } from "react-router-dom";
import Shimmer from "./Shimmer";


export default function ProtectedRoute() {

  const { userDetails, appLoading } = useContext(userDataContext);


  if (appLoading) {
    return <Shimmer />;
  }


  if (!userDetails) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
}

