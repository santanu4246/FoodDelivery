import express from "express"
import {SendOtp,VerifyOtp,createuser,logout} from '../controllers/User.js'
const userRouter = express.Router();
userRouter.post('/sendotp',SendOtp)
userRouter.post('/verifyotp',VerifyOtp)
userRouter.post('/createuser',createuser)
userRouter.post(`/logout`,logout)
export default userRouter