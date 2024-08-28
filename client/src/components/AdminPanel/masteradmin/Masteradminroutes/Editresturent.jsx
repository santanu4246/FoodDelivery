import React, { useState } from "react";

const Editresturent = ({ Resturent, onClose }) => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    name: Resturent.name,
    location: Resturent.location,
    cuisine: Resturent.cuisine,
    imageUrl: Resturent.imageUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Restaurant:", updatedRestaurant);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Edit Restaurant</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={updatedRestaurant.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={updatedRestaurant.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={updatedRestaurant.cuisine}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={updatedRestaurant.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editresturent;
