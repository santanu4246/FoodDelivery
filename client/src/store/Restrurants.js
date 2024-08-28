import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const useRestrurant = create(set => ({
  allLocations:[],
  restureantlist:[],
  getAllLocations:async()=>{
    try{
        const response =await axios.get(`${BASE_URL}/getlocations`)
        set({allLocations:response.data.locations})
    }catch(error){
        console.log(error);
    }
  },
  setLocation:async(location)=>{
    try {
        await axios.post(`${BASE_URL}/setlocation`,{location:location.trim()})
    } catch (error) {
        console.log(error);
    }
  },
  getRestrurantByLocation:async()=>{
    set({restureantlist:[]})
    try {
        const response= await axios.get(`${BASE_URL}/getrestrurantbylocation`)
        set({restureantlist:response.data.restrurantList})
        return true
    } catch (error) {
        return false
    }
  },
}));
