import React from "react";
import { RxCross1 } from "react-icons/rx";

const Location = ({ setLocationVisible }) => {
  const locations = ["Bankura", "Kolkata", "Dubai"];

  return (
    <div className="flex justify-center h-[300px] w-full inset-0 bg-transparent text-black absolute z-10 ">
      <div className="relative border border-[#00000038] w-[80%] shadow-md rounded-[10px] bg-white">
        <RxCross1
          onClick={() => {
            setLocationVisible(false);
          }}
          className="absolute top-[20px] right-[20px] text-[18px] cursor-pointer"
        />
        <h2 className="text-center text-[15px] font-[500] mt-[1rem]">
          Select your preferred locaiton
        </h2>
        <ul className="p-[20px] flex gap-5 items-center justify-center">
          {locations.map((location, index) => (
            <li
              onClick={() => {
                setLocationVisible(false);
              }}
              key={index}
              className="px-[1rem] py-[5px] bg-[#e5e5e5] transition-all ease-linear duration-200 hover:bg-[#d2d2d2] rounded-[5px] cursor-pointer"
            >
              {location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Location;
