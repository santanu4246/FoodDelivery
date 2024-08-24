import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import { useFoodCategory } from "../../store/FoodCategory";
const Home = () => {
  const { categoryList } = useFoodCategory();
  const [Slider, setSlider] = useState([]);

  useEffect(() => {
    setSlider(categoryList);
  }, [categoryList]);

  return (
    <div className="HomeContainer">
      <Nav />
      <div className="py-10">
        <h2>Inspiration for your first order</h2>
        <div className="flex gap-5 py-10 overflow-x-auto scrollNone select-none">
          {Slider.map((item, index) => (
            <div key={index} className="">
              <img
                src={item.image}
                className="h-[150px] min-w-[150px] object-cover rounded-[100%]"
              />
              <p className="mt-[10px] text-center text-white font-[500]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
