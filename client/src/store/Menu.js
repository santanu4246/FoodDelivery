import axios from "axios";
import { create } from "zustand";
import { useAdminAuthentication } from "./Authentication";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure VITE_BASE_URL is properly set in your environment

// Get restaurant ID from local storage

export const useMenu = create((set) => ({
  menu: [],
  menuList: [],

  // Function to add a new menu
  addMenu: async (title, fooditems) => {
    const restaurantId = localStorage.getItem("restrurantID");

    try {
      const response = await axios.post(`${BASE_URL}/addmenu/${restaurantId}`, {
        title,
        food: fooditems
      });

      set((state) => ({
        ...state,
        menu: response.data.menu
      }));
    } catch (error) {
      console.error("Error adding menu:", error);
      throw error;
    }
  },
  getMenu: async (restuid) => {
    try {
      const response = await axios.get(`${BASE_URL}/getmenu/${restuid}`);
      set({ menuList: response.data.menu });
    } catch (error) {
      console.log(error);
    }
  },
  updateFood: async (formData,foodid) => {
    try {
      const res = await axios.put(`${BASE_URL}/update-food/${foodid}`,{formData});
      console.log(res.data.food);
    } catch (error) {
      console.log(error);
    }
  }
}));
