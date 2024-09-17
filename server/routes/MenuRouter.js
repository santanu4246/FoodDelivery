import express from "express";
import { addmenu,deletemenu } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:Resturentid", addmenu);
MenuRouter.post("/deletemenu/:Menuid", deletemenu);
export default MenuRouter