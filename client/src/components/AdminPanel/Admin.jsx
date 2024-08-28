import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddFood from "./adminRoutes/AddFood";
import EditFood from "./adminRoutes/EditFood";
import Food from "./adminRoutes/Food";
import RestrurantDetail from "./adminRoutes/RestrurantDetail";
import AdminLogin from "./adminRoutes/AdminLogin";
import { useAdminAuthentication } from "../../store/Authentication.js";
import MasterAdmin from "./masteradmin/MasterAdmin.jsx";
import RestrurantAdmin from "./restrurantAdmin/RestrurantAdmin.jsx";

const routesOfAdmin = [
  { name: "Dashboard", path: "" },
  { name: "Add Food", path: "/addfood" },
  { name: "Edit Food", path: "/editfood" },
  { name: "Food", path: "/food" },
  { name: "Restrurant Detail", path: "/restrurantdetail" }
];



const Admin = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isAuthenticated, adminType, getAdmin, logoutAdmin } =
    useAdminAuthentication();

  useEffect(() => {
    async function getAdminOrMasterAdmin() {
      try {
        await getAdmin();
      } catch (error) {
        console.log(error.response?.data?.msg);
      }
    }
    getAdminOrMasterAdmin();
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  if (isAuthenticated === false) {
    return <AdminLogin />;
  }

  if (isAuthenticated === true && adminType === "masteradmin") {
    return <MasterAdmin />;
  }
  if (isAuthenticated === true && adminType === "admin") {
    return <RestrurantAdmin />;
  }
};

export default Admin;
