import React, { useState } from "react";
import Nav from "../nav/Nav";
const Home = () => {
  const [Slider, setSlider] = useState(Array(20).fill(null));
  return (
    <div className="HomeContainer">
      <Nav />
      <div className="py-10">
        <h2>Inspiration for your first order</h2>
        <div className="flex gap-5 py-10 overflow-x-auto scrollNone">
          {Slider.map((item, index) => (
            <div
              key={index}
              className="h-[100px] min-w-[100px] bg-slate-200 rounded-[50%]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
