import { uploadOnCloudinary, deleteImageFromCloudinary } from "../utils/Cloudinary.js"
import CategoryModel from "../models/FoodCategoryModel.js"
async function AddFoodCategory(req, res) {
    const { name } = req.body
    const file = req.file
    try {
        if (!name || !file) {
            res.status(400).json({ msg: "All fields are not provided", success: false })
const cloudinaryResponse = await uploadOnCloudinary(file.path, "FoodCategory")

        if (!cloudinaryResponse) return res.status(500).json({ msg: "File not uploaded on cloud", success: false })        }
        
        const newCategory = new CategoryModel({
            name,
            image: cloudinaryResponse.url
        })
        const response = await newCategory.save()
        if (response) return res.status(201).json({ msg: "New category added", success: true, Category: response })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while adding food category", error, success: false })
    }
}

async function getAllFoodCategories(req, res) {
    try {
        const response = await CategoryModel.find({}) 
        return res.status(200).json({ msg: "All category fetched", success: true, category_list: response })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while fetching all category", error, success: false })
    }
}

export { AddFoodCategory,getAllFoodCategories }