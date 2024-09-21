import express from "express";
import AuthToken from "../middleware/AuthUser.js";
import {
  SendOtp,
  VerifyOtp,
  createuser,
  logout,
  addToCart
} from "../controllers/User.js";
const userRouter = express.Router();
userRouter.post("/sendotp", SendOtp);
userRouter.post("/verifyotp", VerifyOtp);
userRouter.post("/createuser", createuser);
userRouter.post(`/logout`, logout);
userRouter.post(`/add-to-cart`, AuthToken, addToCart);
export default userRouter;
