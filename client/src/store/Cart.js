// useCart.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      totalItems: 0,
      
      // Add item function
      addItem: (item) => {
        set((state) => {
          // Check if the item already exists in the cart
          const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
          
          if (existingItem) {
            // If item exists, increase its quantity
            return {
              cart: state.cart.map((cartItem) =>
                cartitem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
              total: state.total + item.price,
              totalItems: state.totalItems + 1,
            };
          } else {
            // If item does not exist, add it to the cart
            return {
              cart: [...state.cart, { ...item, quantity: 1 }], // Add item with quantity = 1
              total: state.total + item.price,
              totalItems: state.totalItems + 1,
            };
          }
        });
      },

      // Remove item function
      removeItem: (itemId) => {
        set((state) => {
          const itemToRemove = state.cart.find((item) => item._id === itemId);

          if (!itemToRemove) {
            return state;
          }

          return {
            cart: state.cart.filter((item) => item._id !== itemId),
            total: state.total - itemToRemove.price * itemToRemove.quantity,
            totalItems: state.totalItems - itemToRemove.quantity,
          };
        });
      },

      // Increment item quantity
      incrementQuantity: (itemId) => {
        set((state) => {
          const itemToUpdate = state.cart.find((item) => item._id === itemId);

          if (!itemToUpdate) {
            return state;
          }

          return {
            cart: state.cart.map((item) =>
              item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ),
            total: state.total + itemToUpdate.price,
            totalItems: state.totalItems + 1,
          };
        });
      },

      // Decrement item quantity
      decrementQuantity: (itemId) => {
        set((state) => {
          const itemToDecrement = state.cart.find((item) => item._id === itemId);

          if (!itemToDecrement || itemToDecrement.quantity === 1) {
            return state;
          }

          return {
            cart: state.cart.map((item) =>
              item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
            ),
            total: state.total - itemToDecrement.price,
            totalItems: state.totalItems - 1,
          };
        });
      },
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
