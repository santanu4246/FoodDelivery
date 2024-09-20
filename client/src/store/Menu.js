import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure VITE_BASE_URL is properly set in your environment

// Get restaurant ID from local storage

export const useMenu = create((set) => ({
  menu: [],
  menuList: [],
  cart: [],

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
  updateFood: async (formData, menuid, foodid) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/update-food/${menuid}/${foodid}`,
        formData
      );
      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
    }
  },
  deleteFood: async (menuid, foodid) => {
    console.log(menuid, foodid);

    try {
      const res = await axios.delete(
        `${BASE_URL}/delete-food/${menuid}/${foodid}`
      );
      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
    }
  },
  deleteMenu: async (menuid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletemenu/${menuid}`);
      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addFood: async (formData, menuid) => {
    try {
      const res = await axios.post(`${BASE_URL}/add-food/${menuid}`, formData);
      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: async (food) => {
    set((state) => ({
      cart: [...state.cart, food]
    }));
  }
}));
