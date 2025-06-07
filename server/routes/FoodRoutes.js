import express from "express"
import { addFood, deleteFood, updateFood,AddFoodToDatabase,getMenuWithFoodList,getFoodByMenuId,getFoodByRestuId } from "../controllers/Food.js";
import uploadStorage from "../middleware/Multer.js";
import AuthAdmin from "../middleware/AuthAdmin.js";

const FoodRouter = express.Router()
FoodRouter.post('/addfood/:id', AuthAdmin, addFood);  
FoodRouter.post('/addfood-to-database', uploadStorage.single('image'), AddFoodToDatabase);  
FoodRouter.put('/menu/:foodid', AuthAdmin, updateFood);  
FoodRouter.delete('/menu-delete/:foodid', AuthAdmin, deleteFood); 
FoodRouter.get('/get-food-by-menu-id/:menuid', getFoodByMenuId); 
FoodRouter.get('/get-food-by-restu-id/:restuid', getFoodByRestuId); 
FoodRouter.get('/get-menu-with-food-list/:restuid', getMenuWithFoodList); 
export default FoodRouter