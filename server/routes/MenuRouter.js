import express from "express";
import { addmenu,deletemenu,getmenu } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:id", addmenu);
MenuRouter.post("/deletemenu/:id", deletemenu);
MenuRouter.get("/getmenu/:restuid", getmenu);
export default MenuRouter