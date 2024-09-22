import express from "express"
import { addFood, deleteFood, updateFood,AddFoodToDatabase,getMenuWithFoodList,getFoodByMenuId,getFoodByRestuId } from "../controllers/Food.js";
const FoodRouter = express.Router()
FoodRouter.post('/addfood/:id', addFood);  
FoodRouter.post('/addfood-to-database', AddFoodToDatabase);  
FoodRouter.put('/menu/:foodid', updateFood);  
FoodRouter.delete('/menu/:menuid/:foodid', deleteFood); 
FoodRouter.get('/get-food-by-menu-id/:menuid', getFoodByMenuId); 
FoodRouter.get('/get-food-by-restu-id/:restuid', getFoodByRestuId); 
FoodRouter.get('/get-menu-with-food-list/:restuid', getMenuWithFoodList); 

export default FoodRouter