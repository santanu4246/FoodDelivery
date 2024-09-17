import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    title:[String],
    food:[String],
});

const MenuModel = mongoose.model('Menu', menuSchema);

export default MenuModel