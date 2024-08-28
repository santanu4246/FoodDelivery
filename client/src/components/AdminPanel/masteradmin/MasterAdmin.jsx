import React from "react";
import { useAdminAuthentication } from "../../../store/Authentication.js";
import Addresturent from "./Masteradminroutes/Addresturent.jsx";
import UpdateRestaurant from "./Masteradminroutes/Updateresturent.jsx";
import { Link, Route, Routes, useLocation } from "react-router-dom";
function MasterAdmin() {
  const { logoutAdmin } = useAdminAuthentication();
  const location = useLocation();
  const path = location.pathname;
  const routesOfmasterAdmin = [
    { name: "Add Resturenat", path: "/addresturent" },
    { name: "Edit Resturenat", path: "/updateresturent" }
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side Menu */}
      <div className="w-1/4 bg-blue-900 text-white flex flex-col justify-between p-8">
        <div>
          <h2 className="text-xl font-bold p-4">Master Admin Panel</h2>
          {routesOfmasterAdmin.map((item, index) => {
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
        </div>
        <div className="p-4">
          <button
            onClick={async () => {
              await logoutAdmin();
            }}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="w-full h-screen p-8 overflow-auto">
        <Routes>
          <Route path="/addresturent" element={<Addresturent />} />
          <Route path="/updateresturent" element={<UpdateRestaurant />} />
        </Routes>
      </div>
    </div>
  );
}

export default MasterAdmin;
