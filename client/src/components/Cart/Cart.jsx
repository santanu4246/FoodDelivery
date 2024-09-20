import React from "react";
import CartItem from "./Cartitem";
import useCart from "../../store/Cart";

const Cart = () => {
  const { cart, total, incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
        Your Cart
      </h2>

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
