import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  desc: { type: String },
  rating: { type: Number },
  veg: { type: Boolean, required: true }
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  food: [foodSchema]
});

const MenuModel = mongoose.model("Menu", menuSchema);

export default MenuModel;
