import UserModel from "../models/UserModel.js";
import mailSender from "../utils/Nodemailer.js";
import otpModel from "../models/OtpModel.js";
async function SendOtp(req, res) {
  const { email } = req.body;
  try {
      const otp = generateOtp();
      await mailSender(email, "orrinmadari", otp);
      const newOtp = new otpModel({ email, otp });
      await newOtp.save();
      return res.status(200).json({ msg: "Otp", OtpId: newOtp._id });
  } catch (error) {
    console.log(error);
  }
}

const generateOtp = () => {
  const otp = Math.floor(Math.random() * 4 + 1);
  return otp;
};
export { SendOtp };
