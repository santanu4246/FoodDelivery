import express from "express"
import { addFood, deleteFood, updateFood,AddFoodToDatabase,getMenuWithFoodList,getFoodByMenuId,getFoodByRestuId } from "../controllers/Food.js";
import uploadStorage from "../middleware/Multer.js";
import AuthAdmin from "../middleware/AuthAdmin.js";

// Skip file upload entirely for now
const handleUpload = (req, res, next) => {
  console.log("=== SKIPPING FILE UPLOAD ===");
  req.file = null;
  next();
};

const FoodRouter = express.Router()

// Basic test endpoint - no middleware
FoodRouter.post('/test-basic-food', (req, res) => {
  console.log("=== BASIC TEST ENDPOINT HIT ===");
  console.log("Body:", req.body);
  res.json({ 
    msg: "Basic endpoint works", 
    body: req.body,
    success: true 
  });
});

// Test endpoint with just body parsing
FoodRouter.post('/test-add-food-simple', (req, res) => {
  try {
    console.log("=== SIMPLE TEST ===");
    console.log("Request body:", req.body);
    
    const { foodName, foodPrice, starterType, isVegetarian, restuid } = req.body;
    
    res.json({
      msg: "Simple test successful",
      received: { foodName, foodPrice, starterType, isVegetarian, restuid },
      success: true
    });
  } catch (error) {
    console.error("Simple test error:", error);
    res.status(500).json({ msg: "Simple test failed", error: error.message });
  }
});

FoodRouter.post('/addfood/:id', AuthAdmin, addFood);  
FoodRouter.post('/addfood-to-database', handleUpload, AddFoodToDatabase);  
FoodRouter.put('/menu/:foodid', AuthAdmin, updateFood);  
FoodRouter.delete('/menu-delete/:foodid', AuthAdmin, deleteFood); 
FoodRouter.get('/get-food-by-menu-id/:menuid', getFoodByMenuId); 
FoodRouter.get('/get-food-by-restu-id/:restuid', getFoodByRestuId); 
FoodRouter.get('/get-menu-with-food-list/:restuid', getMenuWithFoodList); 
export default FoodRouter