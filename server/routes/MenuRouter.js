import express from "express";
import { addmenu,deletemenu,getmenu,updateFood,deleteFood,addFood } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:id", addmenu);
MenuRouter.delete("/deletemenu/:id", deletemenu);
MenuRouter.get("/getmenu/:restuid", getmenu);
// MenuRouter.put("/update-menu/:menuid", updateMenu);
MenuRouter.put("/update-food/:menuid/:foodid", updateFood);
MenuRouter.delete("/delete-food/:menuid/:foodid", deleteFood);
MenuRouter.post("/add-food/:menuid", addFood);
export default MenuRouter