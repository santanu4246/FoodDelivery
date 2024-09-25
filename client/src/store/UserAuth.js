import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { persist, createJSONStorage } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;
const restuid = sessionStorage.getItem("paymentrestrurantID");
export const UserAuth = create(
  persist(
    (set, get) => ({
      user: null,
      cart: null,
      totalPrice: 0,
      totalItems: 0,
      totalCartQuantity: 0,
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
          set({ user: null, cart: null, totalPrice: 0, totalItems: 0 });

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
          console.log(res);
          const totalprice = res.data.totalPrice;
          set({ totalCartQuantity: totalprice.length });
          const relevantTotal = totalprice.find(
            (item) => item.restaurant === restuid
          );
          console.log(relevantTotal);
          
          if (relevantTotal) {
            set({ totalPrice: relevantTotal.totalPrice });
          }
          toast.success(res.data.msg);
          return res.data;
        } catch (error) {
          console.log("error", error);
        }
      },
      getCart: async () => {
        try {
          const res = await axios.get(`${BASE_URL}/get-cart`);
          const totalprice = res.data.totalPrice;
          const relevantTotal = totalprice.find(
            (item) => item.restaurant === restuid
          );
          console.log(relevantTotal);
          
          if (relevantTotal) {
            set({ totalPrice: relevantTotal.totalPrice });
          }
          set({
            cart: res.data.cart,
          });
        } catch (error) {
          console.log(error);
        }
      },
      incrementItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/increment-item`, {
            foodId,
          });
          const totalprice = res.data.totalPrice;
          console.log(totalprice);
          set({ totalCartQuantity: totalprice.length });

          const relevantTotal = totalprice.find(
            (item) => item.restaurant === restuid
          );
          console.log(relevantTotal);
          
          if (relevantTotal) {
            set({ totalPrice: relevantTotal.totalPrice });
          }

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
          const totalprice = res.data.totalPrice;
          console.log(totalprice);
          set({ totalCartQuantity: totalprice.length });

          const relevantTotal = totalprice.find(
            (item) => item.restaurant === restuid
          );
          if (relevantTotal) {
            set({ totalPrice: relevantTotal.totalPrice });
          }

          toast.success(res.data.msg);
          get().getCart();
        } catch (error) {
          console.log(error);
        }
      },
      removeItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/remove-item`, { foodId });
          const totalprice = res.data.totalPrice;
          set({ totalCartQuantity: totalprice.length });
          if (totalprice.length === 0) {
            set({ totalPrice: 0 });
          } else {
            const relevantTotal = totalprice.find(
              (item) => item.restaurant === restuid
            );
            if (relevantTotal) {
              set({ totalPrice: relevantTotal.totalPrice });
            }
          }
          get().getCart();
          toast.success(res.data.msg);
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
        totalPrice: state.totalPrice,
        totalCartQuantity: state.totalCartQuantity,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
