import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    title: { type: String, required: true },
    food:[String],
});

const MenuModel = mongoose.model('Menu', menuSchema);

export default MenuModel