import React, { useState } from "react";
import Location from "./Location";
import { CiLocationOn } from "react-icons/ci";
import Login from "../Login/Login";
import { UserAuth } from "../../store/UserAuth";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Nav = () => {
  const [locationVisible, setLocationVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const handleClick = () => {
    setLocationVisible((prev) => !prev);
  };
  const { user, logout } = UserAuth();

  return (
    <div className="bg-gray-50 shadow-md">
      <nav className="flex justify-between items-center py-5 px-8 md:px-12 lg:px-16">
        {/* Branding Section */}
        <h1 className="text-xl font-bold text-gray-900 tracking-wide transition duration-200 hover:text-red-600 cursor-pointer">
          OrrinSanMato
        </h1>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            id="inputField"
            type="text"
            placeholder="Search for restaurants..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
            aria-label="Search for restaurants"
          />
        </div>

        {/* User Actions Section */}
        <div className="flex items-center space-x-6">
          {/* Location Button */}
          <div
            onClick={handleClick}
            className="flex items-center cursor-pointer text-gray-700 hover:text-red-600 transition duration-200"
            aria-label="Toggle location"
          >
            <CiLocationOn className="text-2xl" />
            <span className="ml-2 font-medium">Location</span>
          </div>

          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={async () => await logout()}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setLogin(true)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Login"
            >
              Log in
            </button>
          )}
        </div>

        {/* User Info Display */}
        {user && (
          <div className="flex items-center gap-2 ml-4">
            <FaUser className="text-xl text-gray-700" />
            <p className="text-gray-800 font-medium">{user.name}</p>
          </div>
        )}
        
        {/* Cart Icon */}
        <div className="relative flex items-center cursor-pointer">
          <FaCartShopping className="text-2xl text-gray-700 hover:text-red-600 transition duration-200 ml-2" />
          {/* Optional: Add cart item count here */}

        </div>
      </nav>

      {/* Conditional Components */}
      {login && <Login setLogin={setLogin} />}
      {locationVisible && <Location setLocationVisible={setLocationVisible} />}
    </div>
  );
};

export default Nav;
