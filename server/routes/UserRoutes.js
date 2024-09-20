import express from "express"
import {SendOtp,VerifyOtp} from '../controllers/User.js'
const userRouter = express.Router();
userRouter.post('/sendotp',SendOtp)
userRouter.post('/verifyotp',VerifyOtp)
export default userRouter