import UserModel from "../models/UserModel.js";
import mailSender from "../utils/Nodemailer.js";
import otpModel from "../models/OtpModel.js";
import jwt from "jsonwebtoken";
import CartModel from "../models/CartModel.js";
import mongoose from "mongoose";

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
          role: existingUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });

      return res.status(200).json({
        message: "Otp verified successfully",
        user: existingUser,
        isExisting: true,
      });
    }
    return res.status(200).json({
      message: "Otp verified successfully",
      user: null,
      isExisting: false,
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
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });

      return res.status(200).json({
        message: "Otp verified successfully",
        user: newUser,
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
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.cart) {
      const newCart = new CartModel({
        user: user._id,
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
        foods: [food],
      };
      cart.items.push(obj);
    }
    await updateCartTotals(cart._id);
    await cart.save();
    return res.status(200).json({ msg: "Food added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
// Utility function to update cart totals
async function updateCartTotals(cartId) {
  try {
    // Find the cart and populate the nested food field
    const cart = await CartModel.findById(cartId)
      .populate({
        path: "items.restaurant",
        model: "Restrurant",
        select: "name",
      })
      .populate({
        path: "items.foods.food",
        model: "Food",
        select: "price name",
      })
      .exec();

    if (!cart) {
      throw new Error("Cart not found");
    }

    console.log("Full populated cart:", JSON.stringify(cart, null, 2));
    const cartItems = cart.items.map((item) => item.foods);
    console.log("Cart Items:", cartItems);
    const food = cartItems.map((item) => item.map((foodItem) => foodItem));
    console.log("Food:", food);

    let totalItems = 0;
    let totalPrice = 0;

    // Loop through each item in the cart to calculate totals
    cart.items.forEach((item) => {
      console.log("Restaurant:", item.restaurant);
      console.log("Foods:", item.foods);

      if (item.foods.length > 0) {
        item.foods.forEach((foodItem) => {
          console.log("Food Item:", foodItem);

          // Check if food field is populated and exists
          if (foodItem.food && foodItem.food.price) {
            console.log("Populated Food:", foodItem.food); // Log populated food details
            totalItems += foodItem.quantity;
            totalPrice += foodItem.quantity * foodItem.food.price;
          } else {
            console.log("Food not populated or missing price", foodItem);
          }
        });
      }
    });

    console.log("Total Items:", totalItems);
    console.log("Total Price:", totalPrice);

    // Update cart with calculated totals
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    // Save the updated cart
    await cart.save();
    console.log("Updated cart:", cart);

    
  } catch (error) {
    console.log("Error in updateCartTotals: ", error);
    throw new Error(error.message || "Error updating cart totals");
  }
}

async function getCart(req, res) {
  const { role } = req;
  if (role !== "user") {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const userid = req.id;
    console.log(userid);

    const user = await UserModel.findById(userid);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const cart = await CartModel.findById(user.cart)
      .populate({
        path: "items.restaurant",
        model: "Restrurant",
      })
      .populate({
        path: "items.foods._id",
        model: "Food",
      });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    return res.status(200).json({ msg: "Cart fetched successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
async function incrementItem(req, res) {
  try {
    const { foodId } = req.body;
    const userid = req.id;

    const cart = await CartModel.findOne({ user: userid });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = cart.items.find((item) =>
      item.foods.some((food) => food._id.equals(foodId))
    );

    if (item) {
      const foodItem = item.foods.find((food) => food._id.equals(foodId));
      if (foodItem) {
        foodItem.quantity += 1;
        await updateCartTotals(cart._id);
        await cart.save();

        return res.status(200).json({ msg: "Item quantity increased" });
      }
    }
    return res.status(404).json({ msg: "Item not found in cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function decrementItem(req, res) {
  try {
    const { foodId } = req.body;
    const userid = req.id;

    const cart = await CartModel.findOne({ user: userid });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = cart.items.find((item) =>
      item.foods.some((food) => food._id.equals(foodId))
    );
    console.log("decrement items", item);
    if (item) {
      const foodItem = item.foods.find((food) => food._id.equals(foodId));
      if (foodItem) {
        if (foodItem.quantity > 1) {
          foodItem.quantity -= 1;
        } else {
          return res.json({ msg: "Quantity cannot go below 1." });
        }
        await updateCartTotals(cart._id);
        await cart.save();
        return res.status(200).json({ msg: "Item quantity decreased" });
      }
    }
    return res.status(404).json({ msg: "Item not found in cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function removeItem(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.id;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items.forEach((item) => {
      item.foods = item.foods.filter((food) => !food._id.equals(foodId));
    });

    cart.items = cart.items.filter((item) => item.foods.length > 0);
    await updateCartTotals(cart._id);
    await cart.save();

    return res.status(200).json({ msg: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export {
  SendOtp,
  addToCart,
  VerifyOtp,
  createuser,
  logout,
  getCart,
  incrementItem,
  decrementItem,
  removeItem,
};
