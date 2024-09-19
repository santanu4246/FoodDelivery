import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

// Individual Cart Item Component
const CartItem = ({ name, price, quantity, increment, decrement }) => {
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300 hover:bg-gray-50 transition">
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">₹{price} each</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={decrement}
            className={`flex items-center justify-center p-2 rounded-full transition ${
              quantity === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
            }`}
            disabled={quantity === 1}
          >
            <FaMinus className="text-white" />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={increment}
            className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
          >
            <FaPlus />
          </button>
        </div>
        <p className="mt-2 font-semibold text-gray-800">Total: ₹{totalPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;
