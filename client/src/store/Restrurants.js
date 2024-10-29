import axios from "axios";
import { create } from "zustand";
import debounce from "lodash/debounce"; // Import debounce from lodash
const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useRestrurant = create((set) => ({
  allLocations: [],
  restureantlist: [],
  searchResults: [],
  location: "",
  getAllLocations: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getlocations`);
      set({ allLocations: response.data.locations });
    } catch (error) {
      console.log(error);
    }
  },
  setLocation: async (location) => {
    try {
      await axios.post(`${BASE_URL}/setlocation`, {
        location: location.trim(),
      });
    } catch (error) {
      console.log(error);
    }
  },
  getRestrurantByLocation: async () => {
    set({ restureantlist: [] });
    try {
      const response = await axios.get(`${BASE_URL}/getrestrurantbylocation`);
      set({
        restureantlist: response.data.restrurantList,
        location: response.data.location,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  searchRestaurants: debounce(async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchrestaurants`, {
        params: { search: searchTerm },
      });
      console.log(response.data.results);

      set({ searchResults: response.data.results });
    } catch (error) {
      console.log(error);
    }
  }, 300),
  GetRestaurentByCategory: async (category) => {
    console.log(category);
    
    try {
      const response = await axios.get(
        `${BASE_URL}/getrestrurantbycatagory/${category}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
