import React, { useState } from "react";


function AddFood() {
  const [title, setTitle] = useState(""); 
  const [foodName, setFoodName] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [isVegetarian, setIsVegetarian] = useState(false); 
  const [foodItems, setFoodItems] = useState([]); 
  const [foodImage, setFoodImage] = useState(null); 

 
  const addFoodItem = () => {
    const newFoodItem = {
      name: foodName,
      price: parseFloat(price),
      veg: isVegetarian,
      image: foodImage, 
    };
    setFoodItems([...foodItems, newFoodItem]);

  
    setFoodName("");
    setPrice("");
    setIsVegetarian(false);
    setFoodImage(null);
  };

  const handleFoodImageChange = (e) => {
    setFoodImage(e.target.files[0]); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({title,foodItems});
    
    setFoodItems([])
    setTitle("")
  };

  return (
    <div className="min-h-full w-full flex justify-center bg-gray-100 py-5">
      <div className="max-h-[140vh] w-[50%] bg-white shadow-2xl p-10 rounded-lg">
        <h2 className="uppercase text-center pb-5 text-black text-[30px] font-extrabold">
          Add Food Items to Menu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-black text-[18px] font-bold mb-2">
              Menu Title
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

          {/* Adding food items */}
          <div className="flex flex-col">
            <label htmlFor="foodName" className="text-black text-[18px] font-bold mb-2">
              Food Item Name
            </label>
            <input
              type="text"
              id="foodName"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-black text-[18px] font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            <label htmlFor="isVegetarian" className="text-black text-[18px] font-bold mb-2">
              Vegetarian
            </label>
          </div>

          {/* Upload food item image */}
          <div className="flex flex-col">
            <label htmlFor="foodImage" className="text-black text-[18px] font-bold mb-2">
              Food Item Image
            </label>
            <input
              type="file"
              id="foodImage"
              className="border-2 border-gray-300 p-2 rounded-md"
              onChange={handleFoodImageChange}
            />
          </div>

          <button
            type="button"
            onClick={addFoodItem} // Button to add the current food item to the array
            className="bg-blue-500 text-white p-2 rounded-md font-bold w-full"
          >
            Add Food Item
          </button>

          <ul className="list-disc pl-5">
            {foodItems.map((item, index) => (
              <li key={index} className="text-black">
                {item.name} - ${item.price} - {item.veg ? "Vegetarian" : "Non-Vegetarian"}
              </li>
            ))}
          </ul>


          <button
            type="submit"
            className="bg-[#111111] text-white p-3 rounded-md font-bold w-full"
          >
            Submit Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
