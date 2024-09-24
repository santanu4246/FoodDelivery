import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { persist, createJSONStorage } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const UserAuth = create(
  persist(
    (set, get) => ({
      user: null,
      cart: null,
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
            otp,
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
            name,
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
          set({ user: null, cart: null });
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      addToCart: async (food) => {
        const user = get().user;
        if (!user || !user._id) {
          toast.warn("Login to add food to cart");
          return;
        }
        try {
          const res = await axios.post(`${BASE_URL}/add-to-cart`, { food });
          toast.success(res.data.msg);
          return res.data;
        } catch (error) {
          console.log("error", error);
        }
      },
      getCart: async () => {
        try {
          const res = await axios.get(`${BASE_URL}/get-cart`);
          set({ cart: res.data.cart });
        } catch (error) {
          console.log(error);
        }
      },
      incrementItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/increment-item`, {
            foodId,
          });
          toast.success(res.data.msg);

          get().getCart();
        } catch (error) {
          console.log(error);
        }
      },
      decrementItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/decrement-item`, {
            foodId,
          });
          toast.success(res.data.msg);
          get().getCart();
        } catch (error) {
          console.log(error);
        }
      },
      removeItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/remove-item`, { foodId });
          toast.success(res.data.msg);
          get().getCart();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "user",
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
