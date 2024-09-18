import React, { useState } from "react";

function UpdateFood({ food, onClose }) {
  const [title, setTitle] = useState(food.name);
  const [description, setDescription] = useState(food.description);
  const [image, setImage] = useState(food.imageUrl);
  const [price, setPrice] = useState(food.price || '');
  const [isVegetarian, setIsVegetarian] = useState(food.isVegetarian || false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, image, price, isVegetarian });
    console.log(food._id);
    
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-black">Update Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-bold mb-2 text-black">Food Title</label>
            <input
              type="text"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2 text-black">Description</label>
            <textarea
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2 text-black">Price</label>
            <input
              type="number"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-2 text-black">Food Image</label>
            <input
              type="file"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isVegetarian}
              onChange={(e) => setIsVegetarian(e.target.checked)}
            />
            <label className="font-bold text-black">Vegetarian</label>
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
