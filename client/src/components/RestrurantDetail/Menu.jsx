import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../store/Cart";
import { useMenu } from "../../store/Menu";
import { UserAuth } from "../../store/UserAuth";
import { toast } from "react-toastify";

const Menu = () => {
  const { id } = useParams();
  const [MenuIndex, setMenuIndex] = useState(0);

  const { MenuWithFoodList, getMenuWithFoodList } = useMenu();
  const { addToCart } = UserAuth();
  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id]);

  return (
    <div className="mt-8 flex flex-col md:flex-row md:gap-10">
      {/* Left: Menu Titles */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Menu</h3>
        <div className="space-y-4">
          {MenuWithFoodList.map((item, index) => {
            return (
              <div
                onClick={() => setMenuIndex(index)}
                className="cursor-pointer transition ease-in-out duration-200 bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded-lg font-medium shadow-sm hover:shadow-md"
                key={index}
              >
                <p className="text-lg text-gray-700">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Food Items for the Selected Title */}
      <div className="w-full md:w-2/3 mt-8 md:mt-0 border border-[#00000023] p-6 rounded-lg shadow-md">
        {/* Veg Food Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            Veg Food Items
          </h2>
          {MenuWithFoodList.length > 0 &&
            MenuWithFoodList[MenuIndex].foods.map((item, index) => {
              if (item.veg === true) {
                return (
                  <div
                    className="flex justify-between items-center mb-3 bg-green-50 p-3 rounded-lg"
                    key={index}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-green-600 font-bold">
                      ${item.price}
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await addToCart(item);
                        } catch (error) {
                          toast.error(error);
                        }
                      }}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Add
                    </button>
                  </div>
                );
              }
            })}
        </div>

        {/* Nonveg Food Section */}
        <div>
          <h2 className="text-lg font-semibold text-cyan-700 mb-4">
            Nonveg Food Items
          </h2>
          {MenuWithFoodList.length > 0 &&
            MenuWithFoodList[MenuIndex].foods.map((item, index) => {
              if (item.veg === false) {
                return (
                  <div
                    className="flex justify-between items-center mb-3 bg-cyan-50 p-3 rounded-lg"
                    key={index}
                  >
                    <span className="font-medium text-cyan-700">
                      {item.name}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      ${item.price}
                    </span>
                    <button
                      onClick={async () => {
                        await addToCart(item);
                      }}
                      className="px-4 py-1 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
                    >
                      Add
                    </button>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
