import React, { useState } from "react";
import { useMenu } from "../../../store/Menu";

function UpdateFood({ food, onClose }) {
  const [title, setTitle] = useState(food.name);
  const [description, setDescription] = useState(food.description);
  const [price, setPrice] = useState(food.price || "");
  const [isVegetarian, setIsVegetarian] = useState(food.isVegetarian || false);

  const { updateFood } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFoodData = {
      name: title, // Update the key to match the backend
      description,
      price,
      isVegetarian,
    };

    await updateFood(updatedFoodData, food.menuid, food._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Update Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-bold mb-2">Food Title</label>
            <input
              type="text"
              className="border-2 border-gray-300 p-2 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2">Description</label>
            <textarea
              className="border-2 border-gray-300 p-2 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2">Price</label>
            <input
              type="number"
              className="border-2 border-gray-300 p-2 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isVegetarian}
              onChange={(e) => setIsVegetarian(e.target.checked)}
            />
            <label className="font-bold">Vegetarian</label>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFood;
