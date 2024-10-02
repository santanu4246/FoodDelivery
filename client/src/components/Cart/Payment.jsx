import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../store/UserAuth";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
function Payment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [foodList, setFoodList] = useState([]);
  const {
    cart,
    incrementItem,
    decrementItem,
    removeItem,
    totalPrice,
    getCart,
    removeCart
  } = UserAuth();

  useEffect(() => {
    sessionStorage.setItem("paymentrestrurantID", id);
    const get = async () => {
      await getCart();
    };
    get();
  }, [id]);

  useEffect(() => {
    if (cart) {
      const foundFoods = cart.items.find((item) => item.restaurant._id === id);
      if (foundFoods && foundFoods.foods) {
        setFoodList(foundFoods.foods);
      }
    }
    if (totalPrice === 0) {
      setFoodList([]);
    }
  }, [cart, id]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handlePayment(withGstPrice) {
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_7cs83Ikm791P0j",
        amount: parseInt(withGstPrice * 100),
        currency: "INR",
        name: "FoodForYou",
        description: "Order your food",
        image: "",
        handler: (response) => {
          resolve(true);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            resolve(false);
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }
  const handleProceedToPayment = async () => {
    const paymentSuccessful = await handlePayment(totalPrice);
    if (paymentSuccessful) {
      try {
        await removeCart(id,foodList)
        navigate("/");
      } catch (error) {
        console.log(error);
      }
      toast.success("Payment successful!");
    } else {
      toast.warn("Payment cancelled or failed.");
    }
  };

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
                    className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition duration-200"
                  >
                    <LuMinus className="text-[18px]"/>
                  </button>
                  <button
                    onClick={() => incrementItem(item._id?._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition duration-200"
                  >
                   <FiPlus  className="text-[18px]"/>
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  removeItem(item._id?._id);
                }}
                className="ml-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-200"
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
          <button
            className="mt-4 bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-200 text-lg"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
