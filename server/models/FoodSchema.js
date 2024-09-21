import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  desc: { type: String },
  rating: { type: Number },
  veg: { type: Boolean, required: true },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu"
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restrurant"
  },
});

const FoodModel = mongoose.model("Food", foodSchema);

export default FoodModel;
