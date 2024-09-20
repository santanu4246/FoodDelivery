import React, { useState } from "react";
import { useMenu } from "../../../store/Menu";

const NewAddFood = ({ onClose, MenuId }) => {
  const [name, setName] = useState(""); // Updated: title -> name
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false); // Changed to match the backend

  const { addFood, getMenu } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructing the food item object as per backend requirements
    const newFoodData = {
      name, // Updated key
      description,
      price: parseFloat(price), // Ensure price is a float
      isVegetarian, // Matching the backend structure for veg status
    };

    console.log("New Food Added: ", newFoodData);

    // Send the new food data to the backend
    await addFood(newFoodData, MenuId);

    // Fetch updated menu list for the restaurant
    const restaurantID = localStorage.getItem("restrurantID");
    await getMenu(restaurantID);

    // Reset form fields after successful submission
    setName(""); // Reset field
    setDescription("");
    setPrice("");
    setIsVegetarian(false);
    onClose(); // Close the form
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-black">
        <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name} // Updated: title -> name
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Vegetarian
            </label>
            <input
              type="checkbox"
              checked={isVegetarian} // Matches backend's expected key
              onChange={(e) => setIsVegetarian(e.target.checked)}
              className="h-4 w-4 text-green-500 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Food
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAddFood;
