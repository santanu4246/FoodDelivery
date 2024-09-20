import axios from "axios";
import { create } from "zustand";

export const UserAuth = create ((set)=>{
    user: null;

    sendotp: async(email)=>{
        axios.post('/sendotp',email)
    }
})