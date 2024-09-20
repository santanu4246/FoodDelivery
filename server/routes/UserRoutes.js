import express from "express"
import {SendOtp,VerifyOtp,createuser} from '../controllers/User.js'
const userRouter = express.Router();
userRouter.post('/sendotp',SendOtp)
userRouter.post('/verifyotp',VerifyOtp)
userRouter.post('/createuser',createuser)
export default userRouter