import express from "express";
import { addmenu,deletemenu,getmenu,updateFood } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:id", addmenu);
MenuRouter.post("/deletemenu/:id", deletemenu);
MenuRouter.get("/getmenu/:restuid", getmenu);
// MenuRouter.put("/update-menu/:menuid", updateMenu);
MenuRouter.put("/update-food/:foodid", updateFood);
export default MenuRouter