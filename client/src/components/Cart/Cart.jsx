import React from "react";
import CartItem from "./Cartitem";
import useCart from "../../store/Cart";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
      <h2 className="text-3xl font-bold text-gray-900 ">
        Your Cart
      </h2>
      <button
  onClick={() => navigate('/')}
  className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
>
  Add more
</button>
      </div>
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            increment={() => incrementQuantity(item._id)}
            decrement={() => decrementQuantity(item._id)}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="mt-8 border-t pt-4 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Total: ₹{total}
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition transform hover:scale-105"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
