import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useRestrurant = create(set => ({
  locaiton: null,
  allLocations:[],
  getAllLocations:async()=>{
    try{
        const response =await axios.get(`${BASE_URL}/getlocations`)
        set({allLocations:response.data.locations})
    }catch(error){
        console.log(error);
    }
  }
}));
