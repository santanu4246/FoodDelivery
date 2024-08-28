import express from "express";
import {
  getAllLocations,
  getAllRestrudents,
  getRestrudentById
} from "../controllers/Restrudent.js";
const RestrudentRouter = express.Router();

RestrudentRouter.get("/getallrestrurants", getAllRestrudents);
RestrudentRouter.get("/getrestrurantbyid/:id", getRestrudentById);
RestrudentRouter.get("/getlocations", getAllLocations);
export default RestrudentRouter;
