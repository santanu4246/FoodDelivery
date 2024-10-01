import UserModel from "../models/UserModel.js";
import mailSender from "../utils/Nodemailer.js";
import otpModel from "../models/OtpModel.js";
import jwt from "jsonwebtoken";
import CartModel from "../models/CartModel.js";

import FoodModel from "../models/FoodSchema.js";
import OrderModel from "../models/OrderModel.js";
import RestrudentModel from "../models/RestrudentModel.js";
async function SendOtp(req, res) {
  const { email } = req.body;

  try {
    const otp = generateOtp(4);
    await mailSender(email, "FoodDelivery Login", `Your otp is ${otp}`);
    const newOtp = new otpModel({ email, otp });
    await newOtp.save();
    return res
      .status(200)
      .json({ msg: "Otp sent to your email", OtpId: newOtp._id });
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
      const cart = await CartModel.findById(existingUser.cart);
      if (cart) {
        const totalPrice = await updateCartTotals(cart._id);
        console.log(cart, totalPrice);

        return res.status(200).json({
          message: "Otp verified successfully",
          user: existingUser,
          isExisting: true,
          totalPrice,
        });
      }
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
    console.log(food);
    const foodId = food._id;
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
    const item = cart.items.find((item) =>
      item.foods.some((food) => food._id.equals(foodId))
    );
    if (item) {
      const foodItem = item.foods.find((food) => food._id.equals(foodId));
      if (foodItem) {
        foodItem.quantity += 1;
        await cart.save();
        const totalPrice = await updateCartTotals(cart._id);
        return res
          .status(200)
          .json({ msg: "Item quantity increased", totalPrice: totalPrice });
      }
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
    await cart.save();
    const totalPrice = await updateCartTotals(cart._id);

    return res.status(200).json({ msg: "Food added to cart", totalPrice });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function updateCartTotals(cartId) {
  try {
    let cart = await CartModel.findById(cartId).select("items");

    let restaurants = cart.items.map((item) => item.restaurant);

    let array = [];

    for (const restu of restaurants) {
      const obj = {
        restaurant: restu,
        totalPrice: 0,
      };
      let total = 0;
      let totalQuantity = 0;
      const item = cart.items.find(
        (item) => item.restaurant.toString() === restu.toString()
      );
      for (const food of item.foods) {
        let quantity = food.quantity;
        const foodData = await FoodModel.findById(food._id.toString()).select(
          "price -_id"
        );
        total += quantity * foodData.price;
        totalQuantity += quantity;
      }
      obj.totalPrice = total;
      array.push(obj);
    }
    return array;
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
    const totalPrice = await updateCartTotals(cart._id);
    return res
      .status(200)
      .json({ msg: "Cart fetched successfully", cart, totalPrice });
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
        await cart.save();
        const totalPrice = await updateCartTotals(cart._id);
        return res
          .status(200)
          .json({ msg: "Item quantity increased", totalPrice: totalPrice });
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

    if (item) {
      const foodItem = item.foods.find((food) => food._id.equals(foodId));
      if (foodItem) {
        if (foodItem.quantity > 1) {
          foodItem.quantity -= 1;
        } else {
          return res.json({ msg: "Quantity cannot go below 1." });
        }
        await cart.save();
        const totalPrice = await updateCartTotals(cart._id);
        return res
          .status(200)
          .json({ msg: "Item quantity decreased", totalPrice: totalPrice });
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
    await cart.save();
    const totalPrice = await updateCartTotals(cart._id);

    return res
      .status(200)
      .json({ msg: "Item removed from cart", totalPrice: totalPrice });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
async function removeCartAfterPayment(req, res) {
  const { restuid, foodlist } = req.body;
  console.log("foodlist", foodlist);
  const userId = req.id;

  const foodIds = foodlist.map((food) => {
    if (food._id._id && typeof food._id._id === "string") {
      return food._id._id;
    }
    throw new Error("Invalid food ID structure");
  });
  console.log("Food IDs to remove:", foodIds);

  try {
    const currentCart = await CartModel.findOne({ user: userId });

    if (!currentCart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = currentCart.items.findIndex(
      (item) => item.restaurant.toString() === restuid
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found in cart" });
    }

    // Remove specified foods from the item
    currentCart.items[itemIndex].foods = currentCart.items[
      itemIndex
    ].foods.filter((food) => !foodIds.includes(food._id.toString()));

    if (currentCart.items[itemIndex].foods.length === 0) {
      currentCart.items.splice(itemIndex, 1);
    }

    const updatedCart = await currentCart.save();

    const cart = await CartModel.findOne({ user: userId });
    const totalPrice = await updateCartTotals(cart._id);
    res.status(200).json({ success: true, updatedCart, totalPrice });

    // Prepare order items with proper structure
    const orderItems = foodlist.map((food) => ({
      name: food._id.name,
      price: food._id.price,
      quantity: food.quantity,
    }));

    // Create a new order with the correct structure
    const order = new OrderModel({
      items: orderItems,
      user: userId,
      restaurant: restuid, // Assuming restuid is the restaurant ID
      menu: foodlist[0]._id.menu, // You can adjust this based on your logic
    });

    // Save the order to the database
    const savedOrder = await order.save();
    console.log("Order created:", savedOrder);

    // Update the UserModel with the new order ID
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { orders: savedOrder._id }, // Push the new order ID
      },
      { new: true }
    );

    const user = await UserModel.findById(userId);
    const restaurant = await RestrudentModel.findById(restuid);

    // Create a detailed order summary for the email
    // Prepare the order summary as HTML table rows
    const orderSummary = orderItems
      .map(
        (item) => `
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
    <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.price}</td>
  </tr>
`
      )
      .join("");

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Send email confirmation with order details
    await mailSender(
      user.email,
      `Your Order Confirmation - ${restaurant?.name || "FoodForYou"}`,
      `
  <html>
    <body>
      <p>Dear ${user.name || "Valued Customer"},</p>

      <p>Thank you for your order with us! We are pleased to confirm that we have received your order, and we are preparing it with care.</p>

      <h3>Order Summary:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${orderSummary}
        </tbody>
      </table>

      <p><strong>Total Amount Due:</strong> ${totalAmount} INR</p>

      <p>We appreciate your trust in us and are committed to providing you with the best service. If you have any questions or need further assistance, please do not hesitate to reach out.</p>

      <p>Thank you for choosing FoodForYou!</p>

      <p>Best Regards,<br>The FoodForYou Team</p>

      <hr style="border: 1px solid #ddd; margin: 20px 0;"/>
      <p style="font-size: 12px; color: #777;">*For inquiries, please contact us at <a href="mailto:support@foodforyou.com">support@foodforyou.com</a> or call us at 9999999999.*</p>
    </body>
  </html>
`
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
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
  removeCartAfterPayment,
};
