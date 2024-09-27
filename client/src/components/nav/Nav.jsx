import React, { useState } from "react";
import Location from "./Location";
import { CiLocationOn } from "react-icons/ci";
import Login from "../Login/Login";
import { UserAuth } from "../../store/UserAuth";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRestrurant } from "../../store/Restrurants";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const [locationVisible, setLocationVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleClick = () => {
    setLocationVisible((prev) => !prev);
  };
  const { user, logout, totalCartQuantity,isLoading } = UserAuth();
  const { searchRestaurants, searchResults } = useRestrurant();

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    await searchRestaurants(searchTerm);
  };

  return (
    <div className="bg-gray-50 shadow-md px-[11%]">
      <nav className="flex justify-between items-center py-5 px-8 md:px-12 lg:px-16">
        
        <h1
          className="text-2xl font-bold text-gray-900 tracking-wide transition duration-200 hover:text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          FoodForYou
        </h1>

    
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
                    <h3 className="text-gray-900 font-semibold text-lg">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.location}</p>
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
              onClick={async () => {await logout()
                navigate("/")
                toast.success("Logout Successful")
              }}
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

        {user && (
          <div className="flex items-center gap-2 ml-4">
            <FaUser className="text-xl text-gray-700" />
            <p className="text-gray-800 font-medium">{user.name}</p>
          </div>
        )}

        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FaCartShopping className="text-2xl text-gray-700 ml-5" />
          <span className="absolute -top-5 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
            {totalCartQuantity}
          </span>
        </div>
      </nav>

      {login && <Login setLogin={setLogin} />}
      {locationVisible && <Location setLocationVisible={setLocationVisible} />}
    </div>
  );
};

export default Nav;
