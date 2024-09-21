// useCart.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      totalItems: 0,
      
      
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
