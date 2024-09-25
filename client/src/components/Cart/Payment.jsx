import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../store/UserAuth";

function Payment() {
  const { id } = useParams();
  const [foodList, setFoodList] = useState([]);
  const { cart, incrementItem, decrementItem, removeItem } = UserAuth();

  useEffect(() => {
    if (cart) {
      const foundFoods = cart.items.find((item) => item.restaurant._id === id);
      if (foundFoods && foundFoods.foods) {
        setFoodList(foundFoods.foods);
      }
    }
  }, [cart, id]);

  const totalPrice = foodList.reduce((total, item) => {
    if (item._id && item._id.price) {
      return total + item.quantity * item._id.price;
    }
    return total;
  }, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Items</h1>
      <div className="flex flex-col items-center gap-[10px]">
        {foodList && foodList.length > 0 ? (
          foodList.map((item, index) => (
            <div
              className="w-[70%] items-center justify-between bg-[#abdbee] flex rounded-lg shadow-lg p-4"
              key={index}
            >
              <div>
                <h2 className="text-lg font-semibold">{item._id?.name}</h2>
                <p className="text-gray-700">
                  Price: ₹{item._id?.price?.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  Quantity: {item.quantity}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => decrementItem(item._id?._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementItem(item._id?._id)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item._id?._id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <div className="w-full flex justify-between gap-[20px]">
        <div></div>
        <div>
          {/* Total Price Display */}
          <div className="mt-4 text-xl font-semibold">
            Total: ₹{totalPrice.toFixed(2)}
          </div>

          {/* Payment Button */}
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
