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
          const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
      
          if (existingItem) {
            // Check if the current quantity is already at or above 10
            if (existingItem.quantity >= 10) {
              return state; 
            }
      
            return {
              cart: state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1 > 10 ? 10 : cartItem.quantity + 1, // Cap at 10
                    }
                  : cartItem
              ),
              total: state.total + (existingItem.quantity < 10 ? item.price : 0), // Only add price if under 10
              totalItems: state.totalItems + (existingItem.quantity < 10 ? 1 : 0), // Only increase total items if under 10
            };
          } else {
            
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
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
              item._id === itemId
                ? { ...item, quantity: item.quantity > 10 ? 10 : item.quantity + 1 }
                : item
            ),
            total: state.total + (itemToUpdate.quantity < 10 ? itemToUpdate.price : 0), 
            totalItems: state.totalItems + (itemToUpdate.quantity < 10 ? 1 : 0), 
          };
        })
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
