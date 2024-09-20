import React, { useEffect, useState } from "react";
import { useMenu } from "../../store/Menu";
import useCart from "../../store/Cart";

const Menu = ({ menu }) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  useEffect(() => {
    if (menu && menu.length > 0) {
      setSelectedMenuIndex(0);
    }
  }, [menu]);
  const handleTitleClick = (index) => {
    setSelectedMenuIndex(index);
  };

  const currentMenu = menu?.[selectedMenuIndex];

  const { addItem } = useCart();

  return (
    <div className="mt-8 flex flex-col md:flex-row md:gap-10">
      {/* Left: Menu Titles */}
      <div className="w-full md:w-1/3">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Menu</h3>
        <div className="space-y-3">
          {menu && menu.length > 0 ? (
            menu.map((menu, index) => (
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
              <h5 className="text-xl font-bold text-green-700 mb-2">
                Vegetarian
              </h5>
              <ul className="list-disc list-inside space-y-2">
                {currentMenu.food
                  .filter((item) => item.veg)
                  .map((vegItem, idx) => (
                    <li
                      key={idx}
                      className="text-lg text-gray-600 hover:text-gray-800 flex justify-between gap-[10px] transition-colors"
                    >
                      {vegItem.name} - ₹{vegItem.price}{" "}
                      {/* Display the price */}
                      <button
                        onClick={async () => {
                          await addItem(vegItem, currentMenu._id);
                        }}
                        className="px-[20px] text-[15px] ml-[10px] bg-[green] text-white rounded-[5px]"
                      >
                        Add
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Non-Veg Section */}
            <div className="mb-4">
              <h5 className="text-xl font-bold text-red-700 mb-2">
                Non-Vegetarian
              </h5>
              <ul className="list-disc list-inside space-y-2">
                {currentMenu.food
                  .filter((item) => !item.veg)
                  .map((nonVegItem, idx) => (
                    <li
                      key={idx}
                      className="text-lg text-gray-600 hover:text-gray-800 flex justify-between transition-colors"
                    >
                      {nonVegItem.name} - ₹{nonVegItem.price}{" "}
                      {/* Display the price */}
                      <button
                        onClick={async () => {
                          await addItem(nonVegItem, currentMenu._id);
                        }}
                        className="px-[20px] text-[15px] ml-[10px] bg-[green] text-white rounded-[5px]"
                      >
                        Add
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-500">
            No menu items available for the selected category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;