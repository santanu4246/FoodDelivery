import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useAdminAuthentication = create((set) => ({
  admin: null,
  adminType: null,
  isAuthenticated: null,
  isLoading: false,
  adminLogin: async (username, password) => {
    if (!username || !password) {
      set({ error: "Username and password are required" });
      return;
    }
    set({ isLoading: true });
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        username,
        password
      });
      if (response.status === 200) {
        set({
          adminType: response.data.user.type,
          admin: response.data.user,
          isAuthenticated: true
        });
      }
      return true;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getAdmin: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/getadmin`);
      if (response.status === 200) {
        set({
          adminType: response.data.admin.type,
          admin: response.data.admin,
          isAuthenticated: true
        });
      }
    } catch (error) {
        set({ isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logoutAdmin:async()=>{
    try {
        await axios.get(`${BASE_URL}/admin/logout`);
        set({admin: null,
            adminType: null,
            isAuthenticated: false})
    } catch (error) {
        throw error
    }finally{
        set({isLoading:false})
    }
  }
}));
