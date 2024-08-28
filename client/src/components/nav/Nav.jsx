import React, { useState } from "react";
import Location from "./Location";
import { CiLocationOn } from "react-icons/ci";
const Nav = () => {
  const [locationVisible, setLocationVisible] = useState(false);

  const handleClick = () => {
    setLocationVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <nav className="flex justify-between py-5 px-[15%]">
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
          <span>Log in</span>
          <span>Sign up</span>
        </div>
      </nav>
      {locationVisible && (
        
          <Location setLocationVisible={setLocationVisible} />
        
      )}
    </div>
  );
};

export default Nav;
