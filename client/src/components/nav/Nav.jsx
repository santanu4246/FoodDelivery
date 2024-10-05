import React, { useState } from "react";
import Location from "./Location";
import { CiLocationOn } from "react-icons/ci";
import Login from "../Login/Login";
import { UserAuth } from "../../store/UserAuth";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRestrurant } from "../../store/Restrurants";
import { toast } from "react-toastify";
import Loginoption from "../Login/Loginoption";

const Nav = () => {
  const navigate = useNavigate();
  const [locationVisible, setLocationVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loginOptions, setloginOptions] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleClick = () => {
    setLocationVisible((prev) => !prev);
    setMobileMenuVisible(false); // Hide mobile menu when showing location
  };

  const { user, logout, totalCartQuantity = 0 } = UserAuth();
  const { searchRestaurants, searchResults } = useRestrurant();

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    await searchRestaurants(searchTerm);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  return (
    <div className="bg-gray-50 shadow-md px-[5%] lg:px-[11%]">
      <nav className="flex justify-between items-center py-5">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-gray-900 tracking-wide transition duration-200 hover:text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          FoodForYou
        </h1>

        {/* Hamburger Icon for Mobile View */}
        <div className="lg:hidden" onClick={toggleMobileMenu}>
          {mobileMenuVisible ? (
            <AiOutlineClose className="text-3xl cursor-pointer" />
          ) : (
            <HiMenu className="text-3xl cursor-pointer" />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center flex-grow justify-between">
          {/* Search Input */}
          <div className="relative flex-grow mx-4">
            <input
              id="inputField"
              type="text"
              placeholder="Search for restaurants..."
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              aria-label="Search for restaurants"
            />
            {searchTerm && searchResults.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((restaurant) => (
                  <li
                    key={restaurant._id}
                    className="flex items-center px-4 py-3 hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
                    onClick={() => {
                      setSearchTerm(restaurant.name);
                      navigate(`/restrurant/${restaurant._id}`);
                      setSearchTerm("");
                    }}
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-12 h-12 object-cover rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {restaurant.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {searchTerm && searchResults.length === 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <p className="text-center text-gray-500">No Results Found</p>
              </div>
            )}
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

            {user ? (
              <button
                onClick={async () => {
                  await logout();
                  navigate("/");
                  toast.success("Logout Successful");
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setloginOptions(true)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                aria-label="Login"
              >
                Log in
              </button>
            )}
          </div>

          {/* User Profile Dropdown */}
          {user && (
            <div className="relative flex items-center gap-2 ml-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <FaUser className="text-xl text-gray-700" />
                <div className="text-gray-800 font-medium ml-2">
                  {user.name}
                </div>
                <IoIosArrowDropdown
                  className={`text-[18px] ml-1 transition-transform duration-200 ${
                    dropdownVisible ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {/* Dropdown Menu */}
              {dropdownVisible && (
                <div className="absolute left-0 top-[20px] mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        navigate("/myprofile");
                        setDropdownVisible(false);
                      }}
                      className="px-4 py-2 hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
                    >
                      My Profile
                    </li>
                    <li
                      onClick={() => {
                        navigate("/myorders");
                        setDropdownVisible(false);
                      }}
                      className="px-4 py-2 hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
                    >
                      My Orders
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaCartShopping className="text-2xl text-gray-700 ml-5" />
            <span className="absolute -top-5 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
              {totalCartQuantity}
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <div className="lg:hidden flex flex-col items-center space-y-4 p-4 border-t border-gray-200">
          {/* Search Input */}
          <input
            id="mobileInputField"
            type="text"
            placeholder="Search for restaurants..."
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
            aria-label="Search for restaurants"
          />
          {searchTerm && searchResults.length > 0 && (
            <ul className="w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((restaurant) => (
                <li
                  key={restaurant._id}
                  className="flex items-center px-4 py-3 hover:bg-red-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => {
                    setSearchTerm(restaurant.name);
                    navigate(`/restrurant/${restaurant._id}`);
                    setSearchTerm("");
                    setMobileMenuVisible(false); // Hide mobile menu after selecting a restaurant
                  }}
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {restaurant.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Location Button */}
          <div
            onClick={handleClick}
            className="flex items-center cursor-pointer text-gray-700 hover:text-red-600 transition duration-200"
            aria-label="Toggle location"
          >
            <CiLocationOn className="text-2xl" />
            <span className="ml-2 font-medium">Location</span>
          </div>

          {/* User Profile */}
          {user && (
            <>
              <span className="font-[600]">{user.name}</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/myprofile");
                  setMobileMenuVisible(false);
                }}
              >
                <FaUser className="text-xl text-gray-700" />
                <div className="text-gray-800 font-medium">My Profile</div>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/myorders");
                  setMobileMenuVisible(false);
                }}
              >
                <FaUser className="text-xl text-gray-700" />
                <div className="text-gray-800 font-medium">My Orders</div>
              </div>
            </>
          )}

          {/* Cart Icon */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => {
              navigate("/cart");
              setMobileMenuVisible(false);
            }}
          >
            <FaCartShopping className="text-2xl text-gray-700" />
            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
              {totalCartQuantity}
            </span>
          </div>

          {/* Login Button */}
          {user ? (
            <button
              onClick={async () => {
                await logout();
                navigate("/");
                toast.success("Logout Successful");
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setloginOptions(true)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Login"
            >
              Log in
            </button>
          )}
        </div>
      )}

      {/* Location and Login Dialogs */}
      {locationVisible && (
        <Location setlocationVisible={setLocationVisible} />
      )}
      {login && <Login setLogin={setLogin} />}
      {loginOptions && <Loginoption setloginOptions={setloginOptions} setLogin={setLogin} />}
    </div>
  );
};

export default Nav;
