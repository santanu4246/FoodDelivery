import React from "react";

function Skeleton() {
  return (
    <div className="relative h-[350px] md:w-[300px] lg:w-[350px] bg-gray-200 rounded-[10px] flex flex-col items-center justify-start py-[10px] mt-5 overflow-hidden">
      <div className="h-[70%] w-[90%] bg-gray-300 rounded-[10px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
      </div>
      <div className="w-full px-[1.3rem] flex justify-between absolute bottom-[20px]">
        <div className="space-y-2">
          <div className="h-[20px] bg-gray-300 rounded-[5px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
          </div>
          <div className="h-[15px] bg-gray-300 rounded-[5px] relative overflow-hidden w-[100px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="h-[20px] bg-gray-300 rounded-[5px] relative overflow-hidden w-[30px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
          </div>
          <div className="h-[15px] bg-gray-300 rounded-[5px] relative overflow-hidden w-[80px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
          </div>
          <div className="h-[15px] bg-gray-300 rounded-[5px] relative overflow-hidden w-[40px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer -rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
