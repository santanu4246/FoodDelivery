import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  desc: { type: String },
  rating: { type: Number },
  veg: { type: Boolean, required: true }
});

const FoodModel = mongoose.model("Food", foodSchema);

export default FoodModel;
