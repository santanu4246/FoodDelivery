import express from "express";
import { AddFoodCategory, getAllFoodCategories } from "../controllers/FoodCategory.js";
import uploadStorage from "../middleware/Multer.js"
const FoodCategoryRouter = express.Router()
FoodCategoryRouter.post("/addcategory", uploadStorage.single("image"), AddFoodCategory)
FoodCategoryRouter.get("/getcategory",getAllFoodCategories)

export default FoodCategoryRouter