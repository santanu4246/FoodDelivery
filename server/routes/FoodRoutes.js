import express from "express"
import { addFood, deleteFood, updateFood } from "../controllers/Food.js";
const FoodRouter = express.Router()
FoodRouter.post('/addfood/:id', addFood);  
FoodRouter.put('/menu/:menuid/:foodid', updateFood);  
FoodRouter.delete('/menu/:menuid/:foodid', deleteFood); 

export default FoodRouter