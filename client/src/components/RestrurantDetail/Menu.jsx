import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMenu } from "../../store/Menu";
import { UserAuth } from "../../store/UserAuth";
import { toast } from "react-toastify";

const Menu = () => {
  const { id } = useParams();
  const [MenuIndex, setMenuIndex] = useState(0);

  const { MenuWithFoodList, getMenuWithFoodList } = useMenu();
  const { addToCart } = UserAuth();
  console.log("foodlist",MenuWithFoodList);
  
  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id, getMenuWithFoodList]);

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-8 lg:px-12">
      {/* Left: Menu Titles */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-md shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Menu List</h3>
        <div className="space-y-3">
          {MenuWithFoodList.map((item, index) => (
            <div
              onClick={() => setMenuIndex(index)}
              className={`cursor-pointer transition ease-in-out duration-200 px-4 py-3 rounded-md ${
                MenuIndex === index
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-red-100"
              }`}
              key={index}
            >
              <p className="text-base font-medium">{item.title} ({item.foods.length}) </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Food Items for the Selected Title */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-md shadow-md border border-gray-200">
        {/* Veg Food Section */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-green-700 mb-4 border-b-2 border-green-400 pb-1">
            Veg Food Items
          </h2>
          {MenuWithFoodList.length > 0 &&
            MenuWithFoodList[MenuIndex].foods
              .filter((item) => item.veg === true)
              .map((item, index) => (
                <div
                  className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 bg-green-50 p-4 rounded-md shadow-sm transition hover:shadow-md"
                  key={index}
                >
                  <div className="mb-2 md:mb-0">
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex justify-between md:justify-end items-center gap-4 md:gap-6">
                    <span className="text-md font-semibold text-green-700">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await addToCart(item);
                         
                        } catch (error) {
                          toast.error("Failed to add item to cart");
                        }
                      }}
                      className="px-4 py-1 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* Nonveg Food Section */}
        <div>
          <h2 className="text-xl font-medium text-red-700 mb-4 border-b-2 border-red-400 pb-1">
            Non-Veg Food Items
          </h2>
          {MenuWithFoodList.length > 0 &&
            MenuWithFoodList[MenuIndex].foods
              .filter((item) => item.veg === false)
              .map((item, index) => (
                <div
                  className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 bg-red-50 p-4 rounded-md shadow-sm transition hover:shadow-md"
                  key={index}
                >
                  <div className="mb-2 md:mb-0">
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex justify-between md:justify-end items-center gap-4 md:gap-6">
                    <span className="text-md font-semibold text-red-700">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await addToCart(item);
                          
                        } catch (error) {
                          toast.error("Failed to add item to cart");
                        }
                      }}
                      className="px-4 py-1 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
