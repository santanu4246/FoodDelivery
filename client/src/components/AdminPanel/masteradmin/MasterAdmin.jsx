import React from "react";
import { useAdminAuthentication } from "../../../store/Authentication.js";

function MasterAdmin() {
  const { logoutAdmin } = useAdminAuthentication();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side Menu */}
      <div className="w-1/4 bg-blue-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">Master Admin Panel</h2>
          <ul className="mt-4">
            <li className="p-4 hover:bg-blue-700 cursor-pointer">Dashboard</li>
            <li className="p-4 hover:bg-blue-700 cursor-pointer">
              Add Restaurant
            </li>
            <li className="p-4 hover:bg-blue-700 cursor-pointer">
              Manage Orders
            </li>
            <li className="p-4 hover:bg-blue-700 cursor-pointer">
              User Management
            </li>
          </ul>
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
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to the Dashboard
        </h1>
        <div className="bg-white p-6 rounded shadow-md">
          {/* Dashboard content goes here */}
          <p>
            Here you can add or manage content related to restaurants, orders,
            and users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MasterAdmin;
