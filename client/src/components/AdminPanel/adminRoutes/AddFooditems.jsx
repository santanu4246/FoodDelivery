// import React, { useState } from 'react';
// import { useMenu } from '../../../store/Menu';

// function AddFooditems() {
//   const [foodName, setFoodName] = useState('');
//   const [price, setPrice] = useState('');
//   const [isVegetarian, setIsVegetarian] = useState(false);
//   const [foodItems, setFoodItems] = useState([]);
//   const {addFood} = useMenu();
//   const addFoodItem = () => {
//     const newItem = {
//       name: foodName,
//       price: price,
//       veg: isVegetarian,
//     };
//     setFoodItems([...foodItems, newItem]);
//     setFoodName(''); // clear input after adding
//     setPrice(''); // clear price input
//     setIsVegetarian(false); // reset checkbox
//   };
// const handleSubmit = async ()=>{
//   try {
//     await addFood(foodItems)
//   } catch (error) {
//     console.log(error);

//   }
// }
//   return (
//     <form className="flex flex-col space-y-4">
//       <div className="flex flex-col">
//         <label htmlFor="foodName" className="text-black text-[18px] font-bold mb-2">
//           Food Item Name
//         </label>
//         <input
//           type="text"
//           id="foodName"
//           className="border-2 border-gray-300 p-2 rounded-md text-black"
//           value={foodName}
//           onChange={(e) => setFoodName(e.target.value)}
//         />
//       </div>

//       <div className="flex flex-col">
//         <label htmlFor="price" className="text-black text-[18px] font-bold mb-2">
//           Price
//         </label>
//         <input
//           type="number"
//           id="price"
//           className="border-2 border-gray-300 p-2 rounded-md text-black"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           id="isVegetarian"
//           className="mr-2"
//           checked={isVegetarian}
//           onChange={(e) => setIsVegetarian(e.target.checked)}
//         />
//         <label htmlFor="isVegetarian" className="text-black text-[18px] font-bold mb-2">
//           Vegetarian
//         </label>
//       </div>

//       {/* Upload food item image */}
//       {/* <div className="flex flex-col">
//         <label htmlFor="foodImage" className="text-black text-[18px] font-bold mb-2">
//           Food Item Image
//         </label>
//         <input
//           type="file"
//           id="foodImage"
//           className="border-2 border-gray-300 p-2 rounded-md"
//           onChange={handleFoodImageChange}
//         />
//       </div> */}

//       <button
//         type="button"
//         onClick={addFoodItem}
//         className="bg-blue-500 text-white p-2 rounded-md font-bold w-full"
//       >
//         Add Food Item
//       </button>

//       <ul className="list-disc pl-5">
//         {foodItems.map((item, index) => (
//           <li key={index} className="text-black">
//             {item.name} - ${item.price} - {item.veg ? "Vegetarian" : "Non-Vegetarian"}
//           </li>
//         ))}
//       </ul>

//       <button
//         type="submit"
//         className="bg-[#111111] text-white p-3 rounded-md font-bold w-full"

//         onClick={handleSubmit}
//       >
//         Submit Menu
//       </button>
//     </form>
//   );
// }

// export default AddFooditems;

import { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";

function AddFooditems() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [starterType, setStarterType] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);

  const { getmenulist, menuDropDownList } = useMenu();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      foodName,
      foodPrice,
      starterType,
      isVegetarian
    });
  };

  useEffect(() => {
    getmenulist();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Food Items
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Starter Type:
          </label>
          <select
            value={starterType}
            onChange={(e) => setStarterType(e.target.value)}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select starter
            </option>
            {
              menuDropDownList.map((item,index)=>{
                return <option value={item.title.toLowerCase()} key={index}>{item.title}</option>
              })
            }
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Vegetarian
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Food Item
        </button>
      </form>
    </div>
  );
}

export default AddFooditems;
