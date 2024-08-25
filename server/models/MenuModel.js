import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    title: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
});

const MenuModel = mongoose.model('Menu', menuSchema);

export default MenuModel