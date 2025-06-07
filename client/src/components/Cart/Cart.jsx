import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProfessionalLoader from "@/Loder/ProfessionalLoader";

function FoodItemCard({ food, restaurantInfo, onIncrement, onDecrement, onRemove }) {
  const [imageError, setImageError] = useState(false);
  
  const getDefaultImage = () => {
    return food._id?.veg 
      ? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center"
      : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-4"
    >
      <div className="flex items-center gap-4">
        {/* Food Image */}
        <div className="relative flex-shrink-0">
          <img
            src={!imageError && food._id?.image ? food._id.image : getDefaultImage()}
            alt={food._id?.name}
            className="w-16 h-16 rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
          {/* Veg/Non-veg Indicator */}
          <div className="absolute -top-1 -right-1">
            <div className={`w-4 h-4 rounded-full border-2 border-white ${
              food._id?.veg ? "bg-green-500" : "bg-red-500"
            }`} />
          </div>
        </div>

        {/* Food Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">
            {food._id?.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <IoLocationSharp className="w-3 h-3 text-gray-400" />
            <span>{restaurantInfo?.name}</span>
          </div>
          <p className="font-semibold text-gray-900">
            ₹{food._id?.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => onDecrement(food._id?._id)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <FiMinus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 py-2 text-sm font-medium">
              {food.quantity}
            </span>
            <button
              onClick={() => onIncrement(food._id?._id)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <FiPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-green-600">
              ₹{(food._id?.price * food.quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => onRemove(food._id?._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function RestaurantSection({ restaurant, foods, onProceedPayment, onIncrement, onDecrement, onRemove }) {
  const totalItems = foods.reduce((sum, food) => sum + food.quantity, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
      {/* Restaurant Header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{restaurant.name}</h2>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <IoLocationSharp className="w-4 h-4 text-gray-400" />
                <span>{restaurant.location}</span>
              </div>
              <p className="text-sm text-gray-500">
                {totalItems} item{totalItems > 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onProceedPayment(restaurant._id)}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Food Items */}
      <div className="p-6 space-y-4">
        <AnimatePresence>
          {foods.map((food) => (
            <FoodItemCard
              key={food._id?._id}
              food={food}
              restaurantInfo={restaurant}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Cart() {
  const { getCart, cart, isLoading, incrementItem, decrementItem, removeItem } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const handleProceedPayment = (restaurantId) => {
    navigate(`/payment/${restaurantId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <ProfessionalLoader />
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to your cart to get started.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Restaurants
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cart.items.map((item) => (
            <RestaurantSection
              key={item._id}
              restaurant={item.restaurant}
              foods={item.foods}
              onProceedPayment={handleProceedPayment}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
              onRemove={removeItem}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;
