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
      totalPrice: 0,
      totalCartQuantity: 0,
      isLoading: false,
      sendotp: async (email) => {
        set({ isLoading: true });
        try {
          const res = await axios.post(`${BASE_URL}/sendotp`, { email });
          toast.success(res.data.msg);
          set({ isLoading: false });
          return res.data.OtpId;
        } catch (error) {
          console.log(error);
        }
      },
      verifyOtp: async (email, otpid, otp) => {
        set({ isLoading: true });
        try {
          const res = await axios.post(`${BASE_URL}/verifyotp`, {
            email,
            otpid,
            otp,
          });
          console.log(res);
          if (res.data.isExisting === true) {
            const totalprice = res.data.totalPrice;
            set({ totalCartQuantity: totalprice.length });
            console.log(totalprice);
            set({ user: res.data.user });
            return res.data;
          }
          set({ isLoading: false });
          return res.data;
        } catch (error) {
          set({ isLoading: false });
          toast.warn("wrong otp");
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
          toast.success("Login Succesful");
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          const res = await axios.post(`${BASE_URL}/logout`);
          set({
            user: null,
            cart: null,
            totalPrice: 0,
            totalCartQuantity: 0,
            isLoading: false,
            isAdtocart: false,
          });
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
        set({ isAdtocart: true });
        try {
          const res = await axios.post(`${BASE_URL}/add-to-cart`, { food });
          console.log(res);
          const totalprice = res.data.totalPrice;
          const restuid = sessionStorage.getItem("paymentrestrurantID");
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
        } finally {
          set({ isAdtocart: false });
        }
      },
      getCart: async () => {
        set({ isLoading: true });
        try {
          const res = await axios.get(`${BASE_URL}/get-cart`);
          const totalprice = res.data.totalPrice;
          const restuid = sessionStorage.getItem("paymentrestrurantID");
          set({
            cart: res.data.cart,
          });
          const relevantTotal = totalprice.find(
            (item) => item.restaurant === restuid
          );
          console.log(relevantTotal);

          if (relevantTotal) {
            set({ totalPrice: relevantTotal.totalPrice });
          } else {
            set({ totalPrice: 0 });
          }
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      incrementItem: async (foodId) => {
        try {
          const res = await axios.post(`${BASE_URL}/increment-item`, {
            foodId,
          });
          const totalprice = res.data.totalPrice;

          const restuid = sessionStorage.getItem("paymentrestrurantID");
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
          const restuid = sessionStorage.getItem("paymentrestrurantID");
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
          const restuid = sessionStorage.getItem("paymentrestrurantID");
          if (totalprice.length === 0) {
            set({ totalPrice: 0, cart: null });
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
      removeCart: async (restuid, foodlist) => {
        try {
          const res = await axios.post(`${BASE_URL}/remove-cart`, {
            restuid,
            foodlist,
          });
          const totalprice = res.data.totalPrice;
          console.log("totalprice", totalprice);

          set({ totalCartQuantity: totalprice.length });
        } catch (error) {
          console.log(error);
        }
      },
      UserOrder: async () => {
        set({ isLoading: true });
        try {
          const res = await axios.get(`${BASE_URL}/userorder`, {
            withCredentials: true,
          });
          return res;
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      useprofile: async () => {
        try {
          const res = await axios.get(`${BASE_URL}/useprofile`);
          console.log(res);
          set({ user: res.data.user });
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },

      updateProfile: async (formdata) => {
        try {
          console.log(formdata);
          const res = await axios.put(`${BASE_URL}/updateprofile`, formdata);
          console.log(res);
        } catch (error) {
          throw error;
        }
      },
      validateToken: async () => {
        try {
          const res = await axios.post(
            `${BASE_URL}/validate-token`,
            {},
            {
              withCredentials: true, 
            }
          );

          if (res.status === 200) {
            const userData = res.data.user; 
            set({ user: userData, totalCartQuantity:res.data.totalPrice.length ,isAuthValid: true });
            return true; 
          }
          return false; 
        } catch (error) {
          console.error(
            "Token validation failed:",
            error.response?.data?.message || error.message
          );
          set({ user: null, isAuthValid: false }); 
          return false; 
        }
      },

      initializeAuth: async () => {
        
        const tokenIsValid = await get().validateToken(); // Validate the token
        if (!tokenIsValid) {
          set({ user: null }); // Reset user state if the token is not valid
        } else {
          // Proceed with fetching user profile if token is valid
          try {
            const res = await axios.get(`${BASE_URL}/useprofile`);
            if (res.data.user) {
              set({ user: res.data.user });
            }
          } catch (error) {
            console.error("Failed to fetch user profile:", error.message);
          }
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
