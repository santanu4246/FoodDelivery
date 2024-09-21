import express from "express"
import { addFood, deleteFood, updateFood,AddFoodToDatabase } from "../controllers/Food.js";
const FoodRouter = express.Router()
FoodRouter.post('/addfood/:id', addFood);  
FoodRouter.post('/addfood-to-database', AddFoodToDatabase);  
FoodRouter.put('/menu/:menuid/:foodid', updateFood);  
FoodRouter.delete('/menu/:menuid/:foodid', deleteFood); 

export default FoodRouter