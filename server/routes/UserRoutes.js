import express from "express";
import AuthToken from "../middleware/AuthUser.js";
import {
  SendOtp,
  VerifyOtp,
  createuser,
  logout,
  addToCart,
  getCart,
  incrementItem,
  decrementItem,
  removeItem,
  removeCartAfterPayment,
  myorders,
  myprofile,
  updateProfile,
  validtoken
} from "../controllers/User.js";
const userRouter = express.Router();
userRouter.post("/sendotp", SendOtp);
userRouter.post("/verifyotp", VerifyOtp);
userRouter.post("/createuser", createuser);
userRouter.post(`/logout`, logout);
userRouter.post(`/add-to-cart`, AuthToken, addToCart);
userRouter.get(`/get-cart`, AuthToken, getCart);
userRouter.post("/increment-item", AuthToken, incrementItem);
userRouter.post("/decrement-item", AuthToken, decrementItem);
userRouter.post("/remove-item", AuthToken, removeItem);
userRouter.post("/remove-cart", AuthToken, removeCartAfterPayment);
userRouter.get("/userorder", AuthToken, myorders);
userRouter.get("/useprofile", AuthToken, myprofile);
userRouter.put("/updateprofile", AuthToken, updateProfile);
userRouter.post('/validate-token',validtoken)
export default userRouter;
