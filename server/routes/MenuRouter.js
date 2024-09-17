import express from "express";
import { addmenu,deletemenu } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:id", addmenu);
MenuRouter.post("/deletemenu/:id", deletemenu);
export default MenuRouter