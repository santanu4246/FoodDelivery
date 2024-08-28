import React from "react";

const Location = () => {
  const locations = ["Bankura", "Kolkata", "Dubai"];

  return (
    <div className="h-[300px] w-full inset-0 bg-black absolute z-10">
      <ul className="flex gap-5 items-center justify-center">
        {locations.map((location, index) => (
          <li key={index} className="text-white">{location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Location;