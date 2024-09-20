import express from "express"
import {SendOtp} from '../controllers/User.js'
const userRouter = express.Router();
userRouter.post('/sendotp',SendOtp)
export default userRouter