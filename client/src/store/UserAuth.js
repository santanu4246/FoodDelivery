import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const UserAuth = create((set) => ({
  user: null,
  sendotp: async (email) => {
    try {
        axios.post(`${BASE_URL}/sendotp`, { email });
    } catch (error) {
        console.log(error);
        
    }
  }
}));
