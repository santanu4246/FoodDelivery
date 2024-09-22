import React, { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";
import { toast } from "react-toastify";

const UpdateFood = ({ foodItem, menuItem, onClose,fetchMenuItems }) => {
  const { menuDropDownList, getmenulist, updateFood } = useMenu();
  const [foodName, setFoodName] = useState(foodItem?.name || "");
  const [foodPrice, setFoodPrice] = useState(foodItem?.price || "");
  const [isveg, setisveg] = useState(foodItem.veg);
  const [prevStarterType, setPrevStarterType] = useState(menuItem?.title || "");
  const [starterType, setStarterType] = useState(menuItem?.title);
  const [foodid, setfoodid] = useState("");


  const updatedfood = {
    foodName,
    foodPrice,
    starterType,
    prevStarterType,
    isveg,
  };
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFood(updatedfood, foodid),
      onClose();
      await fetchMenuItems();
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getmenulist();
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="text-black max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Food Item in {menuItem?.title || "Menu"}
        </h2>
        <form onSubmit={handelsubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Name:
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter food name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Price:
            </label>
            <input
              type="number"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter food price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Menu Type:
            </label>
            <select
              value={starterType}
              onChange={(e) => {
                setStarterType(e.target.value), setPrevStarterType(starterType);
              }}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select starter
              </option>
              {menuDropDownList.map((item, index) => {
                return (
                  <option value={item.title} key={index}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isveg}
              onChange={(e) => setisveg(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Vegetarian
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setfoodid(foodItem._id)}
          >
            Update Food Item
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
