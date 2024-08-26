import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
const Admin = () => {
  return (
    <div className="h-screen w-full bg-gray-700 px-[10%] relative">
      

        <div className="h-screen w-[20vw] flex flex-col items-center py-11">

          <h2>Welcome Orrin</h2>
          <div className="flex flex-col gap-5 py-[5rem]">
            <Link to={"/dashboard"}>
            <span>Dashboard</span>
            </Link>
            <span>Add Food</span>
            <span>Edit Food</span>
            <span>Food</span>
            <span>Schedule</span>
            <span>Admin Details</span>
          </div>

        
        <button className="absolute bottom-24 bg-red-600 h-[40px] w-[15%] rounded-md">Log Out</button>
        
        

      </div>

      <div className="right">
        <Routes>
            <Route>
                
            </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
