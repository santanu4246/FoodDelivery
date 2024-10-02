import React, { useEffect, useRef, useState } from "react";
import { useFoodCategory } from "../../store/FoodCategory";
import { useRestrurant } from "../../store/Restrurants";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const { categoryList } = useFoodCategory();
  const { getAllLocations, getRestrurantByLocation, restureantlist } =
    useRestrurant();
  const [Slider, setSlider] = useState([]);
  const [Resturents, setResturents] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const updateArrowsVisibility = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      updateArrowsVisibility();
      sliderRef.current.addEventListener("scroll", updateArrowsVisibility);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("scroll", updateArrowsVisibility);
      }
    };
  }, [Slider]); // Re-run when Slider content changes

  return (
    <div className="HomeContainer">
      {/* Category Slider Section */}
      <div className="py-10 bg-gray-100 w-full px-[14%]">
        <div className="relative flex items-center">
          {showLeftArrow && (
            <button
              onClick={() => scrollSlider("left")}
              className="absolute left-[-50px] top-[40%] bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-200 transition duration-300"
            >
              <IoIosArrowBack className="text-[20px] text-black" />
            </button>
          )}

          <div
            className="flex gap-8 py-10 overflow-x-auto scrollNone select-none slider"
            ref={sliderRef}
          >
            {Slider.map((item, index) => (
              <div key={index} className="text-center cursor-pointer">
                <img
                  src={item.image}
                  className="h-[150px] w-[150px] min-w-[150px] object-cover rounded-full"
                />
                <p className="mt-4 text-black font-semibold">{item.name}</p>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={() => scrollSlider("right")}
              className="absolute right-[-50px] top-[40%] bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-200 transition duration-300"
            >
              <IoIosArrowForward className="text-[20px] text-black" />
            </button>
          )}
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="mb-5 px-[10%] py-10">
        <h2 className="text-black text-[28px] font-bold mb-8">
          Locality Restaurants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem]">
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
                    className="relative h-[350px] w-[350px] bg-white rounded-lg flex flex-col items-center justify-start p-4 mt-5 shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 cursor-pointer"
                    key={index}
                  >
                    <div className="h-[70%] w-full rounded-lg overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt=""
                        className="object-cover w-full h-full transition duration-300 transform hover:scale-105"
                      />
                    </div>
                    <div className="w-full px-4 flex justify-between items-start">
                      <div className="">
                        <h4 className="font-semibold text-lg text-gray-800">
                          {item.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {item.cuisine
                            .slice(0, 3)
                            .map((cuisineItem, index) => (
                              <span key={index}>
                                {cuisineItem}
                                {index < 2 && index < item.cuisine.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          {item.cuisine.length > 3 && <span>...</span>}
                        </span>
                      </div>
                      <div className="flex flex-col items-end text-sm text-gray-600">
                        {/* <span className="font-semibold text-gray-800">
                          ⭐ {item.rating}
                        </span> */}
                        <span>₹{item.perThali} for one</span>
                        <span>39 min</span>
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
