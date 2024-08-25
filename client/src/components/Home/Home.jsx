import React, { useEffect, useState } from "react";
import { useFoodCategory } from "../../store/FoodCategory";
const Home = () => {
  const { categoryList } = useFoodCategory();
  const [Slider, setSlider] = useState([]);
  const [Resturents, setResturents] = useState(Array(10).fill(null));
  useEffect(() => {
    setSlider(categoryList);
  }, [categoryList]);

  return (
    <div className="HomeContainer px-[15%]">
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

      <div className="mb-5">
        <h2>Locality Restaurants</h2>
        <div className="grid grid-cols-3 gap-[5rem]">
          {Resturents.map((item, index) => {
            return (
              <div className="h-[350px] w-[350px] bg-white rounded-[10px] flex flex-col items-center justify-start py-5 mt-5">
                <div className="h-[85%] w-[90%] rounded-[10px] bg-black"></div>
                <div className=" w-[90%] flex justify-between">
                  <div className="">
                    <h4>Food Hunter</h4>
                    <span>North indian,khabab...</span>
                  </div>
                  <div className="flex flex-col  items-end">
                    <span>New</span>
                    <span>₹200 for two</span>
                    <span>39min</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      

    </div>
  );
};

export default Home;
