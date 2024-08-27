import React from 'react';

function EditFood() {
  const foodItems = [
    { id: 1, name: "Pizza", description: "Cheesy goodness with toppings", imageUrl: "" },
    { id: 2, name: "Burger", description: "Juicy beef patty with fresh lettuce", imageUrl: "" },
    { id: 3, name: "Sushi", description: "Delicious sushi rolls", imageUrl: "" },
    { id: 3, name: "Sushi", description: "Delicious sushi rolls", imageUrl: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {foodItems.map((food,index) => (
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
            </div>

            <div className="flex justify-between w-full mt-8 px-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all">
                Update
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditFood;
