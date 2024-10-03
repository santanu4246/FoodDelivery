import { create } from "zustand"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useFoodCategory = create((set) => ({
    categoryList: [],
    isLoading:null,
    fetchCategory: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get(`${BASE_URL}/getcategory`)
            set({ categoryList: response.data.category_list })
          
        } catch (error) {
            throw error
        }finally{
            set({isLoading:false})
        }
    }
}))