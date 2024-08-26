import React from "react";

function Dashboard() {
  return (
    <div className="h-screen w-full ">
      <h2 className="uppercase text-center pt-10 pb-5 text-black text-[40px] font-extrabold">DashBoard</h2>

      <hr className="bg-[#111111] h-[1.5px] border-0" />

      <div className="grid grid-cols-2 gap-5 px-5 py-5 w-full ">
      <div className="h-[400px] min-w-[50%] bg-white shadow-2xl">
        <div className="w-full flex justify-between items-center px-[3rem] py-[1rem] ">
          <h2 className="text-black text-[25px] font-[500]">Total Revenue</h2>
          <div className="w-[250px] h-[60px] bg-[#d9d9d9] flex justify-center items-center gap-5 rounded-md ">
            <span className="bg-white text-black p-1.5 rounded-md">
              Monthly
            </span>
            <span className="bg-white text-black p-1.5 rounded-md">Weekly</span>
            <span className="bg-white text-black p-1.5 rounded-md">Today</span>
          </div>
        </div>
      </div>

      <div className="h-[400px] min-w-[50%]  grid grid-cols-2 gap-5  justify-end items-center">
        <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
          <div className="flex items-center gap-5">
            <img src="https://res.cloudinary.com/orrin/image/upload/v1724677107/1_hdoajx.png" alt="" className="h-[100px] "/>
            <div className="flex flex-col">
              <span className="text-black text-[35px] font-bold">128</span>
              <span className="text-black text-[18px]">Total Menus</span>
            </div>
          </div>
        </div>
        <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
          <div className="flex items-center gap-5">
            <img src="https://res.cloudinary.com/orrin/image/upload/v1724677108/2_s4r06q.png" alt="" className="h-[100px] "/>
            <div className="flex flex-col">
              <span className="text-black text-[35px] font-bold">400</span>
              <span className="text-black text-[18px]">Total Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
          <div className="flex items-center gap-5">
            <img src="https://res.cloudinary.com/orrin/image/upload/v1724677108/3_v4qnh9.png" alt="" className="h-[100px] "/>
            <div className="flex flex-col">
              <span className="text-black text-[35px] font-bold">67</span>
              <span className="text-black text-[18px]">Items Sold</span>
            </div>
          </div>
        </div>
        <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
          <div className="flex items-center gap-5">
            <img src="https://res.cloudinary.com/orrin/image/upload/v1724677064/4_hqosdx.png" alt="" className="h-[100px] "/>
            <div className="flex flex-col">
              <span className="text-black text-[35px] font-bold">128</span>
              <span className="text-black text-[18px]">Total order</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400px] min-w-[50%] bg-white px-5 py-5 shadow-2xl">
        <span className="text-black">Chart Js</span>
      </div>

      <div className="h-[400px] min-w-[50%] bg-white px-5 py-5 shadow-2xl">
        
        <span className="text-black text-[25px] font-[500]">Top Selling items</span>
        <div className="py-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="h-[100px] w-[100px] bg-red-400 rounded-lg">
            <img src="" alt="" />
          </div>
          <div className="">
            <span className="text-black text-[18px] font-[400]">Pizza</span>
          </div>
        </div>

          <div className="">
            <span className="text-black text-[18px] font-[400]">120</span>
            <span className="text-black">...</span>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
