import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useMenu = create((set, get) => ({
  menu: [],
  menuList: [],
  menuDropDownList: [],

  addMenu: async (title) => {
    const restaurantId = localStorage.getItem("restrurantID");

    try {
      const response = await axios.post(`${BASE_URL}/addmenu/${restaurantId}`, {
        title
      });

      set((state) => ({
        ...state,
        menu: [...state.menu, response.data.menu]
      }));

      toast.success("Menu added successfully!");
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error("Failed to add menu.");
      throw error;
    }
  },

  getMenu: async (restuid) => {
    try {
      const response = await axios.get(`${BASE_URL}/restaurant/${restuid}`);

      set({ menuList: response.data.menu });
      toast.success("Menus fetched successfully!");
    } catch (error) {
      console.error("Error fetching menus:", error);
      toast.error("Failed to fetch menus.");
    }
  },

  updateFood: async (formData, menuid, foodid) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/menu/${menuid}/${foodid}`,
        formData
      );
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Failed to update food.");
    }
  },

  deleteFood: async (menuid, foodid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/menu/${menuid}/${foodid}`);
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Failed to delete food.");
    }
  },

  deleteMenu: async (menuid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/menu/${menuid}`);
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu.");
      throw error;
    }
  },

  addFood: async (formData, menuid) => {
    try {
      const res = await axios.post(`${BASE_URL}/addfood/${menuid}`, formData);
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Failed to add food.");
    }
  },

  getmenulist: async (restuid) => {
    try {
      restuid = localStorage.getItem("restrurantID");
      const { data } = await axios.get(`${BASE_URL}/get-menu-list/${restuid}`);
      set({menuDropDownList:data.menu})
    } catch (error) {
      console.log(error);
    }
  }
}));
