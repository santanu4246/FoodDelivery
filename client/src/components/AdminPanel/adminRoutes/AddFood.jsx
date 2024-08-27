import React, { useState } from "react";

function AddFood() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, price, image, isVegetarian });
  };

  return (
    <div className="h-full w-full flex justify-center bg-gray-100 py-5">
      <div className="max-h-[140vh] w-[50%] bg-white shadow-2xl p-10 rounded-lg">
        <h2 className="uppercase text-center pb-5 text-black text-[30px] font-extrabold">
          Add Food Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-black text-[18px] font-bold mb-2"
            >
              Food Title
            </label>
            <input
              type="text"
              id="title"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-black text-[18px] font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-black text-[18px] font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-black text-[18px] font-bold mb-2"
            >
              Food Image
            </label>
            <input
              type="file"
              id="image"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isVegetarian"
              className="mr-2"
              checked={isVegetarian}
              onChange={(e) => setIsVegetarian(e.target.checked)}
            />
            <label
              htmlFor="isVegetarian"
              className="text-black text-[18px] font-bold mb-2"
            >
              Vegetarian
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#111111] text-white p-3 rounded-md font-bold w-full"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
