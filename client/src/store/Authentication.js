import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useAdminAuthentication = create((set) => ({
  admin: null,
  allRestrurants:[],
  adminType: null,
  isAuthenticated: null,
  isLoading: false,
  restrurantDetail:null,
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
      return response.data.msg;
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
  logoutAdmin: async () => {
    try {
      await axios.get(`${BASE_URL}/admin/logout`);
      set({ admin: null, adminType: null, isAuthenticated: false });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  registerAdmin: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${BASE_URL}/masteradmin/register`,
        formData
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getAllRestrurants: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/masteradmin/getalladmins`);
      set({allRestrurants:response.data.allRestrurants})
    } catch (error) {
      throw error;
    }finally{
      set({ isLoading: false });
    }
  },
  deleteAdmin:async(adminId)=>{
    set({ isLoading: true });
    try {
      const response = await axios.delete(`${BASE_URL}/masteradmin/delete/${adminId}`)
      return response.data.msg
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  },
  updateAdmin : async(formData,adminId)=>{
    set({ isLoading: true });
    try {
      const response = await axios.put(`${BASE_URL}/masteradmin/updateadmin/${adminId}`,formData)
      return response.data.msg
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  },
  getRestrurantById:async(id)=>{
    set({ isLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/getrestrurantbyid/${id}`)
      console.log(res);
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  },
}));