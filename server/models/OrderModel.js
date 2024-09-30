import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, requied: true },
  quantity: { type: Number, requied: true },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  restaurant: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Restrurant",
    },
  ],
  menu: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
    },
  ],
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
