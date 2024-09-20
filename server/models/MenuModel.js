import mongoose from "mongoose";
const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  food: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Food"
  }]
});

const MenuModel = mongoose.model("Menu", menuSchema);

export default MenuModel;
