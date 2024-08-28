import React, { useEffect, useState } from "react";
import { useFoodCategory } from "../../store/FoodCategory";
import { useAllresturent } from "../../store/GetallResturants";
const Home = () => {
  const { categoryList } = useFoodCategory();
  const { restureantlist } = useAllresturent();
  const [Slider, setSlider] = useState([]);
  const [Resturents, setResturents] = useState([]);
  useEffect(() => {
    setSlider(categoryList);
  }, [categoryList]);

  useEffect(() => {
    setResturents(restureantlist);
  }, [restureantlist]);
  return (
    <div className="HomeContainer">
      <div className="py-10 bg-gray-100 w-[100%] px-[15%]">
        <h2>Inspiration for your first order</h2>
        <div className="flex gap-5 py-10 overflow-x-auto scrollNone select-none">
          {Slider.map((item, index) => (
            <div key={index} className="">
              <img
                src={item.image}
                className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-[100%]"
              />
              <p className="mt-[10px] text-center text-black font-[500]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 px-[15%] py-10">
        <h2>Locality Restaurants</h2>
        <div className="grid grid-cols-3 gap-[5rem]">
          {Resturents.map((item, index) => {
            return (
              <div
                className="relative h-[350px] w-[350px] bg-white rounded-[10px] flex flex-col items-center justify-start py-[10px] mt-5 hover:shadow-2xl"
                key={index}
              >
                <div className="h-[70%] w-[90%] rounded-[10px] ">
                  <img
                    src={item.image}
                    alt=""
                    className=" object-cover rounded-[10px] w-full h-[250px]"
                  />
                </div>
                <div className="w-full px-[1.3rem] flex justify-between absolute bottom-[20px]">
                  <div className="">
                    <h4>{item.name}</h4>
                    <span>North indian,khabab...</span>
                  </div>
                  <div className="flex flex-col  items-end">
                    <span>{item.rating}</span>
                    <span>₹{item.perThali} for one</span>
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
