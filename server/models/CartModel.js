import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
      },
      foods: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ]
    }
  ],

});

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
