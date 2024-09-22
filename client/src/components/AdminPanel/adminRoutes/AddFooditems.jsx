import { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";

function AddFooditems() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [starterType, setStarterType] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { getmenulist, menuDropDownList, addFoodToDatabase } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      foodName,
      foodPrice,
      starterType,
      isVegetarian
    });
    const restuid = localStorage.getItem("restrurantID");
    await addFoodToDatabase({
      foodName,
      foodPrice,
      starterType,
      isVegetarian,
      restuid
    });
    setFoodName("");
    setFoodPrice("");
    setIsVegetarian(false);
  };

  useEffect(() => {
    getmenulist();
  }, []);

  return (
    <div className="text-black max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
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
            {menuDropDownList.map((item, index) => {
              return (
                <option value={item._id} key={index}>
                  {item.title}
                </option>
              );
            })}
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
