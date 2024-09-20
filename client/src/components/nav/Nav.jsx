import React, { useState } from "react";
import Location from "./Location";
import { CiLocationOn } from "react-icons/ci";
import Login from "../Login/Login";
import { UserAuth } from "../../store/UserAuth";
const Nav = () => {
  const [locationVisible, setLocationVisible] = useState(false);
  const [login, setlogin] = useState(false);
  const handleClick = () => {
    setLocationVisible((prev) => !prev);
  };
  const { user } = UserAuth();

  return (
    <div className="flex flex-col">
      <nav className="flex justify-between py-5 px-[15%] items-center">
        <h3>OrrinSanMato</h3>
        <input
          id="inputField"
          type="text"
          placeholder="Search for restaurant"
          className="w-[30vw] px-4 py-2 border border-white-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
        />
        <div className="flex gap-5">
          <div onClick={handleClick} className="cursor-pointer ">
            <div className="flex items-center">
              <CiLocationOn />
              Location
            </div>
          </div>
          {user !== null ? (
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300">
              Logout
            </button>
          ) : (
            <button
              onClick={() => setlogin(true)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Log in
            </button>
          )}
        </div>
        <div className="">{user !== null && <p>{user.name}</p>}</div>
      </nav>
      {login && <Login setlogin={setlogin} />}
      {locationVisible && <Location setLocationVisible={setLocationVisible} />}
    </div>
  );
};

export default Nav;
