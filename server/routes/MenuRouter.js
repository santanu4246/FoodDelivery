import express from "express";
import { addmenu } from "../controllers/Menu.js";
const MenuRouter = express.Router();
MenuRouter.post("/addmenu/:id", addmenu);
export default MenuRouter