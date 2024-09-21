import UserModel from "../models/UserModel.js";
import mailSender from "../utils/Nodemailer.js";
import otpModel from "../models/OtpModel.js";
import jwt from "jsonwebtoken";
import CartModel from "../models/CartModel.js";
async function SendOtp(req, res) {
  const { email } = req.body;

  try {
    const otp = generateOtp(4);
    await mailSender(email, "FoodDelivery Login", `Your otp is ${otp}`);
    const newOtp = new otpModel({ email, otp });
    await newOtp.save();
    return res.status(200).json({ msg: "Otp", OtpId: newOtp._id });
  } catch (error) {
    console.log(error);
  }
}

function generateOtp(n) {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * Math.pow(10, n - 1));
  const otp = firstDigit * Math.pow(10, n - 1) + remainingDigits;
  return otp;
}

async function VerifyOtp(req, res) {
  const { email, otpid, otp } = req.body;
  try {
    const otpData = await otpModel.findById(otpid);
    if (!otpData) {
      return res.status(400).json({ msg: "OTP expired send again" });
    }
    console.log(otpData.otp);
    if (otpData.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None"
      });

      return res.status(200).json({
        message: "Otp verified successfully",
        user: existingUser,
        isExisting: true
      });
    }
    return res.status(200).json({
      message: "Otp verified successfully",
      user: null,
      isExisting: false
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function createuser(req, res) {
  const { email, name } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      const newUser = new UserModel({ email, name });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None"
      });

      return res.status(200).json({
        message: "Otp verified successfully",
        user: newUser
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
}

async function addToCart(req, res) {
  const { role } = req;
  if (role !== "user") {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const { food } = req.body;
    const userid = req.id;
    const user = await UserModel.findById(userid);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.cart) {
      const newCart = new CartModel({
        user: user._id
      });
      await newCart.save();
      user.cart = newCart._id;
      await user.save();
    }

    const cart = await CartModel.findById(user.cart);
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const isRestaurantExist = cart.items.find(
      (item) => item.restaurant.toString() === food.restaurant.toString()
    );

    if (isRestaurantExist) {
      cart.items.forEach((item) => {
        if (item.restaurant.toString() === food.restaurant.toString()) {
          item.foods.push(food);
        }
      });
    } else {
      const obj = {
        restaurant: food.restaurant,
        foods: [food]
      };
      cart.items.push(obj);
    }
    await cart.save();
    return res.status(200).json({ msg: "Food added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export { SendOtp, addToCart, VerifyOtp, createuser, logout };
