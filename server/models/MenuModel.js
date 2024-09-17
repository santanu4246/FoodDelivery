import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  veg: { type: Boolean, required: true }, 
  price: { type: Number, required: true }, 
});

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  food: [foodItemSchema], 
});

const MenuModel = mongoose.model("Menu", menuSchema);

export default MenuModel;
