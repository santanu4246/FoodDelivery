import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useRestrurant } from "../../store/Restrurants";

const Location = ({ setLocationVisible }) => {
  const { allLocations, setLocation, getRestrurantByLocation } = useRestrurant();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="relative border border-[#00000038] w-[80%] shadow-md rounded-[10px] bg-white">
        <RxCross1
          onClick={() => setLocationVisible(false)}
          className="absolute top-[20px] right-[20px] text-[18px] cursor-pointer"
        />
        <h2 className="text-center text-[15px] font-[500] mt-[1rem]">
          Select your preferred location
        </h2>
        <ul className="p-[20px] flex gap-5 items-center justify-center">
          {allLocations.length > 0 ? (
            allLocations.map((location, index) => (
              <li
                key={index}
                onClick={async () => {
                  try {
                    
                    await setLocation(location);

              
                    await getRestrurantByLocation();

                  
                    setLocationVisible(false);
                  } catch (error) {
                    console.error("Failed to set location:", error);
                  }
                }}
                className="px-[1rem] py-[5px] bg-[#e5e5e5] transition-all ease-linear duration-200 hover:bg-[#d2d2d2] rounded-[5px] cursor-pointer"
              >
                {location}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No locations available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Location;
