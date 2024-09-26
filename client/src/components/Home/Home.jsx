import React, { useEffect, useRef, useState } from "react";
import { useFoodCategory } from "../../store/FoodCategory";
import { useRestrurant } from "../../store/Restrurants";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const { categoryList } = useFoodCategory();
  const { getAllLocations, getRestrurantByLocation, restureantlist } =
    useRestrurant();
  const [Slider, setSlider] = useState([]);
  const [Resturents, setResturents] = useState([]);
  useEffect(() => {
    setSlider(categoryList);
  }, [categoryList]);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  useEffect(() => {
    getRestrurantByLocation();
  }, [getRestrurantByLocation]);

  useEffect(() => {
    setResturents(restureantlist);
  }, [restureantlist]);
  console.log(Resturents);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="HomeContainer">
      <div className="py-10 bg-gray-100 w-[100%] px-[14%]">
        <div className="relative">
          <button
            onClick={() => scrollSlider("left")}
            className="absolute left-[-65px] top-[40%] bg-white text-white p-3 rounded-full z-10"
          >
            <IoIosArrowBack className="text-[20px] text-black" />
          </button>

          {/* Slider */}
          <div
            className="flex gap-[2.2rem] py-10 overflow-x-auto scrollNone select-none slider"
            ref={sliderRef}
          >
            {Slider.map((item, index) => (
              <div key={index}>
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

          <button
            onClick={() => scrollSlider("right")}
            className="absolute right-[-50px] top-[40%] bg-white text-white p-3 rounded-full z-10"
          >
            <IoIosArrowForward className="text-[20px] text-black" />
          </button>
        </div>
      </div>

      <div className="mb-5 px-[15%] py-10">
        <h2 className="text-black text-[25px] font-[500]">
          Locality Restaurants
        </h2>
        <div className="grid grid-cols-3 gap-[5rem]">
          {Resturents.length === 0
            ? Array.from({ length: 3 })
                .fill("")
                .map((_, index) => {
                  return <Skeleton key={index} />;
                })
            : Resturents.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/restrurant/${item._id}`);
                    }}
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
                        <h4 className="font-[600] text-[16px]">{item.name}</h4>
                        <span>
                          {item.cuisine
                            .slice(0, 3)
                            .map((cuisineItem, index) => (
                              <span key={index} className="text-[15px]">
                                {cuisineItem}
                                {index < 2 && index < item.cuisine.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          {item.cuisine.length > 3 && <span>...</span>}
                        </span>
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
