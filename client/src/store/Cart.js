import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useCart = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      totalItems: 0,
      addItem: (item,menuid) => {
        set((state) => ({
          cart: [...state.cart, item],
          total: state.total + item.price,
          totalItems: state.totalItems + 1
        }));
      },
      removeItem: (itemId,menuid) => {
        set((state) => {
          // Find the item in the cart based on the itemId
          const itemToRemove = state.cart.find((item) => item.id === itemId);

          if (!itemToRemove) {
            return state; // Return the current state if item is not found
          }

          return {
            cart: state.cart.filter((item) => item.id !== itemId),
            total: state.total - itemToRemove.price, // Subtract the price of the removed item
            totalItems: state.totalItems - 1
          };
        });
      }
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useCart;
