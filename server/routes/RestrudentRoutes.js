import express from "express";
import {
  getAllLocations,
  getAllRestrudents,
  getRestrudentById,
  getRestrurantByLocation,
  setLocation
} from "../controllers/Restrudent.js";
const RestrudentRouter = express.Router();

RestrudentRouter.get("/getallrestrurants", getAllRestrudents);
RestrudentRouter.get("/getrestrurantbyid/:id", getRestrudentById);
RestrudentRouter.get("/getlocations", getAllLocations);
RestrudentRouter.get("/getrestrurantbylocation", getRestrurantByLocation);
RestrudentRouter.post("/setlocation", setLocation);
export default RestrudentRouter;
