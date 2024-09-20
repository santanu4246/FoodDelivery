import axios from "axios";
import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const UserAuth = create ((set)=>{
    user: null;

    sendotp: async(email)=>{
        axios.post(`${BASE_URL}/sendotp`,{email})
    }
})