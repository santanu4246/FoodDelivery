import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const UserAuth = create(
  persist(
    (set) => ({
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
          if (res.data.isExisting === true) {
            set({ user: res.data.user });
            return res.data;
          }
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
          set({ user: res.data.user });
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          const res = await axios.post(`${BASE_URL}/logout`);
          set({ user: null });
          return res.data;
        } catch (error) {
          console.log(error);
        }
      }
    }),
    {
      name: "user",
      partialize: (state) => ({
        user: state.user
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
