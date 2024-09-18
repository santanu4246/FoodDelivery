import axios from "axios";
import { create } from "zustand";
import { useAdminAuthentication } from "./Authentication";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure VITE_BASE_URL is properly set in your environment

// Get restaurant ID from local storage


export const useMenu = create((set) => ({
    menu: [],

    // Function to add a new menu
    addMenu: async (title, fooditems) => {
        const restaurantId = localStorage.getItem("restrurantID");

        try {
            const response = await axios.post(`${BASE_URL}/addmenu/${restaurantId}`, {
                title,
                food: fooditems,
            });

            set((state) => ({
                ...state,
                menu: response.data.menu,
            }));
        } catch (error) {
            console.error("Error adding menu:", error);
            throw error; 
        }
    },
}));
