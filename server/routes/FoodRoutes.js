import express from "express"
import { addFood, deleteFood, updateFood,AddFoodToDatabase,getMenuWithFoodList,getFoodByMenuId,getFoodByRestuId } from "../controllers/Food.js";
import uploadStorage from "../middleware/Multer.js";
import AuthAdmin from "../middleware/AuthAdmin.js";

const FoodRouter = express.Router();

FoodRouter.post("/addfood/:menuid", AuthAdmin, addFood);
FoodRouter.put("/updatefood/:foodid", AuthAdmin, updateFood);
FoodRouter.delete("/deletefood/:foodid", AuthAdmin, deleteFood);
FoodRouter.get("/getmenu-with-foodlist/:restuid", getMenuWithFoodList);
FoodRouter.get("/getfood-by-menuid/:menuid", getFoodByMenuId);
FoodRouter.get("/getfood-by-restuid/:restuid", getFoodByRestuId);

// Use the updated uploadStorage middleware directly
FoodRouter.post('/addfood-to-database', AuthAdmin, uploadStorage.single('image'), AddFoodToDatabase);

export default FoodRouter;