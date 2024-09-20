import React, { useState } from 'react';
import { useMenu } from '../../../store/Menu';

function AddFooditems() {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const {addFood} = useMenu();
  const addFoodItem = () => {
    const newItem = {
      name: foodName,
      price: price,
      veg: isVegetarian,
    };
    setFoodItems([...foodItems, newItem]);
    setFoodName(''); // clear input after adding
    setPrice(''); // clear price input
    setIsVegetarian(false); // reset checkbox
  };
const handleSubmit = async ()=>{
  try {
    await addFood(foodItems)
  } catch (error) {
    console.log(error);
    
  }
}
  return (
    <form className="flex flex-col space-y-4">
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
      {/* <div className="flex flex-col">
        <label htmlFor="foodImage" className="text-black text-[18px] font-bold mb-2">
          Food Item Image
        </label>
        <input
          type="file"
          id="foodImage"
          className="border-2 border-gray-300 p-2 rounded-md"
          onChange={handleFoodImageChange}
        />
      </div> */}

      <button
        type="button"
        onClick={addFoodItem} 
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

        onClick={handleSubmit}
      >
        Submit Menu
      </button>
    </form>
  );
}

export default AddFooditems;