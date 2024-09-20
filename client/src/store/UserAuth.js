import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const UserAuth = create((set) => ({
  user: null,
  sendotp: async (email) => {
    try {
      const res = await axios.post(`${BASE_URL}/sendotp`, { email });
      return res.data.OtpId;
    } catch (error) {
      console.log(error);
    }
  },
  verifyOtp: async (email, otpid, otp) => {
    try {
      const res = await axios.post(`${BASE_URL}/verifyotp`, {
        email,
        otpid,
        otp
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  createUser: async (email, name) => {
    try {
      const res = await axios.post(`${BASE_URL}/createuser`, {
        email,
        name
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}));
