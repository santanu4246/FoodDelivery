import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../store/UserAuth";

function Payment() {
  const { id } = useParams();
  const [foodList, setFoodList] = useState([]);
  const {
    cart,
    incrementItem,
    decrementItem,
    removeItem,
    totalPrice,
    getCart,
  } = UserAuth();

  useEffect(() => {
    sessionStorage.setItem("paymentrestrurantID", id);
    const get = async ()=>{
    await getCart();
  }
    get();
  }, [id]);
  useEffect(() => {
    if (cart) {
      const foundFoods = cart.items.find((item) => item.restaurant._id === id);
      if (foundFoods && foundFoods.foods) {
        setFoodList(foundFoods.foods);
      }
    }
  }, [cart, id]);

 
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Food Items
      </h1>
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        {foodList && foodList.length > 0 ? (
          foodList.map((item, index) => (
            <div
              className="w-full bg-white rounded-lg p-6 flex justify-between items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={index}
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item._id?.name}
                </h2>
                <p className="text-lg text-gray-600">
                  Price: ₹{item._id?.price?.toFixed(2)}
                </p>
                <p className="text-md text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => decrementItem(item._id?._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-600 transition duration-200"
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementItem(item._id?._id)}
                    className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-green-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item._id?._id)}
                className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-lg">No items in the cart.</p>
        )}
      </div>

      <div className="flex justify-between w-full max-w-3xl mt-8">
        <div className="flex-1"></div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
          <button className="mt-4 bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition duration-200 text-lg">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
