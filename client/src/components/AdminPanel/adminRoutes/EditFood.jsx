import React, { useState } from "react";
import UpdateFood from "./UpdateFood";

function EditFood() {
  const foodItems = [
    { id: 1, name: "Pizza", description: "Cheesy goodness with toppings", imageUrl: "", price: 100 },
    { id: 2, name: "Burger", description: "Juicy chicken patty with fresh lettuce", imageUrl: "", price: 200 },
    { id: 3, name: "Biryani", description: "Delicious", imageUrl: "", price: 110 },
  ];

  const [selectedFood, setSelectedFood] = useState(null);

  const handleUpdateClick = (food) => {
    setSelectedFood(food);
  };

  const closeUpdateForm = () => {
    setSelectedFood(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {foodItems.map((food, index) => (
          <div key={index} className="h-auto w-[350px] bg-white rounded-lg shadow-lg flex flex-col items-center p-6">
            <div className="img h-[200px] w-[200px] bg-gray-200 rounded-full overflow-hidden">
              <img
                src={food.imageUrl}
                alt={`${food.name} Image`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{food.name}</h2>
              <p className="text-gray-500 mt-2">{food.description}</p>
              <p className="text-green-500 mt-2 font-semibold">{food.price}</p>
            </div>

            <div className="flex justify-between w-full mt-8 px-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
                onClick={() => handleUpdateClick(food)}
              >
                Update
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFood && <UpdateFood food={selectedFood} onClose={closeUpdateForm} />}
    </div>
  );
}

export default EditFood;
