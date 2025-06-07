import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useMenu = create((set, get) => ({
  menu: [],
  menuList: [],
  menuDropDownList: [],
  MenuWithFoodList: [],

  addMenu: async (title) => {
    const restaurantId = localStorage.getItem("restrurantID");

    try {
      const response = await axios.post(`${BASE_URL}/addmenu/${restaurantId}`, {
        title,
      });

      set((state) => ({
        ...state,
        menu: [...state.menu, response.data.menu],
      }));
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

  updateFood: async (formData, foodid) => {
    const restuid = localStorage.getItem("restrurantID");
    console.log(restuid);

    try {
      const res = await axios.put(`${BASE_URL}/menu/${foodid}`, { ...formData,restuid});
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Failed to update food.");
    }
  },

  deleteFood: async (foodid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/menu-delete/${foodid}`);
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Failed to delete food.");
    }
  },

  deleteMenu: async (menuid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletemenu/${menuid}`);
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu.");
      throw error;
    }
  },

  getmenulist: async (restuid) => {
    try {
      restuid = localStorage.getItem("restrurantID");
      const { data } = await axios.get(`${BASE_URL}/get-menu-list/${restuid}`);
      set({ menuDropDownList: data.menu });
    } catch (error) {
      console.log(error);
    }
  },
  addFoodToDatabase: async (foodData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/addfood-to-database`,
        foodData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success("Food added successfully");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to add food");
      throw error;
    }
  },

  getfoodbyrestuid: async () => {
    const restuid = localStorage.getItem("restrurantID");
    try {
      const res = await axios.get(
        `${BASE_URL}/get-food-by-restu-id/${restuid}`
      );
      console.log(res);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getFoodByMenuId: async (menuid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/get-food-by-menu-id/${menuid}`
      );
      return data.foods;
    } catch (error) {
      console.log(error);
    }
  },

  getMenuWithFoodList: async (restuid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/get-menu-with-food-list/${restuid}`
      );
      set({ MenuWithFoodList: data.menu });
    } catch (error) {
      console.log(error);
    }
  },
}));
