import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../store/UserAuth";
import { toast } from "react-toastify";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    removeCart,
    isLoading
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
  }, [cart, id, totalPrice]);

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
    return new Promise((resolve) => {
      const options = {
        key: "rzp_test_7cs83Ikm791P0j",
        amount: parseInt(withGstPrice * 100),
        currency: "INR",
        name: "FoodForYou",
        description: "Order your food",
        image: "",
        handler: () => {
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
          color: "#0F172A", // Slate-900 for professional look
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
        await removeCart(id, foodList);
        navigate("/");
        toast.success("Payment successful!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    } else {
      toast.warn("Payment cancelled or failed.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="p-8">
          <FiShoppingBag className="text-6xl text-slate-900 animate-bounce" />
        </div>
      </div>
    );
  }

  if (!foodList || foodList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold text-slate-900 mb-8"
          >
            Your Cart is Empty
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiShoppingBag className="mx-auto text-8xl text-slate-400 mb-6" />
            <p className="text-xl text-slate-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Browse Menu
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-8 text-center"
        >
          Your Order Summary
        </motion.h1>
        
        <Card className="overflow-hidden shadow-md border border-gray-100">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-xl text-slate-900">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {foodList.map((item, index) => (
                <motion.div
                  key={item._id?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-center gap-4 py-4">
                    {/* Food Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item._id?.image || (item._id?.veg 
                          ? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center"
                          : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center")}
                        alt={item._id?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = item._id?.veg 
                            ? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center"
                            : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center";
                        }}
                      />
                      {/* Veg/Non-veg Indicator */}
                      <div className="absolute top-1 left-1">
                        <div className={`w-3 h-3 rounded-full border ${
                          item._id?.veg 
                            ? "bg-green-500 border-green-600" 
                            : "bg-red-500 border-red-600"
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-slate-900">
                        {item._id?.name}
                      </h2>
                      <p className="text-lg font-semibold text-slate-700">
                        ₹{item._id?.price?.toFixed(2)}
                      </p>
                      {item._id?.desc && (
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {item._id.desc}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => decrementItem(item._id?._id)}
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <FiMinus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium w-8 text-center text-slate-900">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => incrementItem(item._id?._id)}
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <FiPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right sm:text-left">
                        <p className="text-sm text-slate-500">Total</p>
                        <p className="text-lg font-bold text-green-600">
                          ₹{(item._id?.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item._id?._id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-md border border-gray-100">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-2xl font-semibold text-slate-900">
                Total Amount: <span className="text-slate-700">₹{totalPrice.toFixed(2)}</span>
              </div>
              <Button
                size="lg"
                onClick={handleProceedToPayment}
                className="w-full sm:w-auto bg-green-900 hover:bg-green-800 text-white text-lg px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Payment;