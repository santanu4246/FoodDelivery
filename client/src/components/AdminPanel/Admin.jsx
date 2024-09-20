import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./adminRoutes/AdminLogin";
import { useAdminAuthentication } from "../../store/Authentication.js";
import MasterAdmin from "./masteradmin/MasterAdmin.jsx";
import RestrurantAdmin from "./restrurantAdmin/RestrurantAdmin.jsx";
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
