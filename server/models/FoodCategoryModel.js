import mongoose from "mongoose";

const CategorrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const CategoryModel = mongoose.model("FoodCategory",CategorrySchema)

export default CategoryModel