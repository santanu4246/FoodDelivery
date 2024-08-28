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

const routesOfAdmin = [
  { name: "Dashboard", path: "" },
  { name: "Add Food", path: "/addfood" },
  { name: "Edit Food", path: "/editfood" },
  { name: "Food", path: "/food" },
  { name: "Restrurant Detail", path: "/restrurantdetail" }
];

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuthentication();
  if (isAuthenticated === false) {
    console.log(isAuthenticated);

    return <Navigate to="/admin" replace />;
  }
  return children;
}

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
    return (
      <div className="text-white  flex h-screen w-[100%] bg-gray-700  relative">
        <div className="h-screen w-[20vw] flex flex-col items-center py-11 relative">
          <h2>Welcome Admin</h2>
          <ul className="flex flex-col gap-5 py-[5rem]">
            {routesOfAdmin.map((item, index) => {
              return (
                <Link key={index} to={`/admin${item.path}`}>
                  <li
                    className={`${
                      path === `/admin${item.path}`
                        ? "border border-white"
                        : "border border-transparent"
                    } px-[1rem] py-[5px] rounded-[5px]`}
                  >
                    {item.name}
                  </li>
                </Link>
              );
            })}
          </ul>

          <button
            onClick={async () => {
              await logoutAdmin();
            }}
            className="absolute bottom-[20px] px-[2rem] bg-red-600 h-[40px] rounded-md"
          >
            Log Out
          </button>
        </div>

        <div className="h-full overflow-y-auto w-[80vw] bg-[#FBFBFB] text-white">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/addfood" element={<AddFood />} />
            <Route path="/editfood" element={<EditFood />} />
            <Route path="/food" element={<Food />} />
            <Route path="/restrurantdetail" element={<RestrurantDetail />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    );
  }
};

export default Admin;
