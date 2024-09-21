import express from "express";
import AuthToken from "../middleware/AuthUser.js";
import {
  SendOtp,
  VerifyOtp,
  createuser,
  logout,
  addToCart,
  getCart
} from "../controllers/User.js";
const userRouter = express.Router();
userRouter.post("/sendotp", SendOtp);
userRouter.post("/verifyotp", VerifyOtp);
userRouter.post("/createuser", createuser);
userRouter.post(`/logout`, logout);
userRouter.post(`/add-to-cart`, AuthToken, addToCart);
userRouter.get(`/get-cart`, AuthToken, getCart);
export default userRouter;
