import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    desc: { type: String },
    rating: { type: Number },
    type: { type: [String], enum: ['veg', 'nonveg'] }
});

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel