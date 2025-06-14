import axios from "axios";
import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const useAdminAuthentication = create((set, get) => ({
  admin: null,
  allRestrurants:[],
  adminType: null,
  isAuthenticated: null,
  isLoading: false,
  restrurantDetail:null,
  orderdetails:[],

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
        const { user } = response.data;
        
        localStorage.setItem("restrurantID", user?.restrurant?._id);
        set({
          adminType: user.type,
          admin: user,
          isAuthenticated: true
        });
       
      }
      return response.data.msg;
    } catch (error) {
      console.error('Admin login error:', error);
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
      console.error('Get admin error:', error);
      set({ isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  logoutAdmin: async () => {
    try {
      await axios.get(`${BASE_URL}/admin/logout`);
      localStorage.removeItem("restrurantID");
      set({ 
        admin: null, 
        adminType: null, 
        isAuthenticated: false
      });
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
      return res.data.restrurant
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  },
  updateRestrurant:async function(id,formData){
    set({ isLoading: true });
    try {
      const res = await axios.put(`${BASE_URL}/updaterestrurant/${id}`,formData)
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  },
  OderDetails: async function() {
    const id = localStorage.getItem("restrurantID")
    set({ isLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/getorders/${id}`)
      console.log(res);
      set({orderdetails:res.data.orderDetails})
    } catch (error) {
      throw error
    }finally{
      set({ isLoading: false });
    }
  }
}));
