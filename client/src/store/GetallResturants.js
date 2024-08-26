import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAllresturent = create((set)=>({
    restureantlist:[],
    fetchresturent: async()=>{
        try {
            const response = await axios.get(`${BASE_URL}/getallrestrurants`)
            console.log(response);
            set({restureantlist:response.data.restrurant})
        } catch (error) {
            throw error
        }
    }
}))