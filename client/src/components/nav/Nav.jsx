import React from "react";

const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between py-5">
        <h3>OrrinSanMato</h3>
        <input
          id="inputField"
          type="text"
          placeholder="Search for resturent"
          className="w-[30vw] px-4 py-2 border border-white-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
        />
        <div className="flex gap-5">
          <span>Log in</span>
          <span>Sign up</span>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
