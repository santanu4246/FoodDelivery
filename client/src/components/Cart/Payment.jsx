import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../store/UserAuth";

function Payment() {
  const { id } = useParams();
  const [foodList, setFoodList] = useState([]);
  const { cart } = UserAuth();

  useEffect(() => {
    const foundFoods = cart.items.find((item) => item.restaurant._id === id);
    if (foundFoods) {
      setFoodList(foundFoods.foods);
    }
  }, [cart, id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Items</h1>
      <div className="flex flex-col items-center gap-[10px]">
        {foodList.map((item, index) => (
          <div
            className="w-[70%] items-center justify-between bg-[#abdbee] flex rounded-lg shadow-lg p-4"
            key={index}
          >
            <div className="">
              <h2 className="text-lg font-semibold">{item._id.name}</h2>
              <p className="text-gray-700">
                Price: ${item._id.price.toFixed(2)}
              </p>
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;
