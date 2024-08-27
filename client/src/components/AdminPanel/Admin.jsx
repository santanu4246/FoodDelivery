import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddFood from "./adminRoutes/AddFood";
import EditFood from "./adminRoutes/EditFood";
import Food from "./adminRoutes/Food";
import RestrurantDetail from "./adminRoutes/RestrurantDetail";
import AdminLogin from "./adminRoutes/AdminLogin";

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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  if (isAdminAuthenticated === null) {
    return <></>;
  }

  if (isAdminAuthenticated === false) {
    return <AdminLogin />;
  }

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

        <button className="absolute bottom-[20px] px-[2rem] bg-red-600 h-[40px] rounded-md">
          Log Out
        </button>
      </div>

      <div className="h-full overflow-y-auto w-[80vw] bg-[#FBFBFB] text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addfood" element={<AddFood />} />
          <Route path="/editfood" element={<EditFood />} />
          <Route path="/food" element={<Food />} />
          <Route path="/restrurantdetail" element={<RestrurantDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
