import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";
import { FaDirections } from "react-icons/fa";

function RestrurantData() {
  const { id } = useParams();
  const { getRestrurantById } = useAdminAuthentication();
  const [restrurantData, setRestrurantData] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0); 

  useEffect(() => {
    async function getRestrurant() {
      try {
        const res = await getRestrurantById(id);
        setRestrurantData(res);
        if (res.menu && res.menu.length > 0) {
          setSelectedMenuIndex(0); 
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (id) getRestrurant();
  }, [id]);

  
  const handleTitleClick = (index) => {
    setSelectedMenuIndex(index); 
  };

  const currentMenu = restrurantData.menu?.[selectedMenuIndex];
  return (
    <div className="min-h-screen w-full px-[8%] py-[5%] bg-gray-50 text-gray-900">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Restaurant Image */}
        <div className="flex justify-center">
          <div className="h-[300px] w-full max-w-xl overflow-hidden rounded-xl shadow-md">
            <img
              src={restrurantData.image}
              alt="Restaurant"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">{restrurantData.name}</h2>
          <div className="mt-2 text-lg text-gray-600">
            {restrurantData.cuisine &&
              restrurantData.cuisine.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < restrurantData.cuisine.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>
          <div className="mt-2 text-lg text-gray-500">{restrurantData.location}</div>

          <div className="mt-4">
            <a
              href={restrurantData.geolocation}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="inline-flex items-center gap-2 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
                <FaDirections className="text-xl" />
                <span>Get Directions</span>
              </div>
            </a>
          </div>
        </div>

        <hr className="mt-8 border-t-1 border-gray-300" />

        {/* Menu Section */}
        <div className="mt-8 flex flex-col md:flex-row md:gap-10">
          {/* Left: Menu Titles */}
          <div className="w-full md:w-1/3">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Menu</h3>
            <div className="space-y-3">
              {restrurantData.menu && restrurantData.menu.length > 0 ? (
                restrurantData.menu.map((menu, index) => (
                  <div
                    key={menu._id}
                    onClick={() => handleTitleClick(index)}
                    className={`cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out ${
                      selectedMenuIndex === index
                        ? "bg-gray-100 border-gray-400 text-gray-900"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <span className="text-xl font-medium">{menu.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-lg text-gray-500">No menu available.</p>
              )}
            </div>
          </div>

          {/* Right: Food Items for the Selected Title */}
          <div className="w-full md:w-2/3 mt-8 md:mt-0">
            {currentMenu ? (
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                  {currentMenu.title}
                </h4>

                {/* Veg Section */}
                <div className="mb-4">
                  <h5 className="text-xl font-bold text-green-700 mb-2">Vegetarian</h5>
                  <ul className="list-disc list-inside space-y-2">
                    {currentMenu.food
                      .filter((item) => item.veg)
                      .map((vegItem, idx) => (
                        <li key={idx} className="text-lg text-gray-600 hover:text-gray-800 transition-colors">
                          {vegItem.name} - ₹{vegItem.price} {/* Display the price */}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Non-Veg Section */}
                <div className="mb-4">
                  <h5 className="text-xl font-bold text-red-700 mb-2">Non-Vegetarian</h5>
                  <ul className="list-disc list-inside space-y-2">
                    {currentMenu.food
                      .filter((item) => !item.veg)
                      .map((nonVegItem, idx) => (
                        <li key={idx} className="text-lg text-gray-600 hover:text-gray-800 transition-colors">
                          {nonVegItem.name} - ₹{nonVegItem.price} {/* Display the price */}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-lg text-gray-500">No menu items available for the selected category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestrurantData;
