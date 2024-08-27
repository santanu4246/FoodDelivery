import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAdminAuthentication = create((set)=>({
    admin:null,
    adminType:null,
    isAuthenticated:false,
    adminLogin:async (username,password)=>{
        if(!username || !password)return
        const response = await axios.post(`${BASE_URL}/admin/login`,{username,password})
        return response
    }
}))