import express from "express";
import {
  getAllLocations,
  getAllRestrudents,
  getRestrudentById,
  getRestrurantByLocation,
  setLocation,
  updateRestrurant,
  searchRestaurants,
  OrderDetails
} from "../controllers/Restrudent.js";
import AuthAdmin from "../middleware/AuthAdmin.js";
import uploadStorage from "../middleware/Multer.js";
const RestrudentRouter = express.Router();

RestrudentRouter.get("/getallrestrurants", getAllRestrudents);
RestrudentRouter.get("/getrestrurantbyid/:id", getRestrudentById);
RestrudentRouter.get("/getlocations", getAllLocations);
RestrudentRouter.get("/getrestrurantbylocation", getRestrurantByLocation);
RestrudentRouter.post("/setlocation", setLocation);
RestrudentRouter.get("/searchrestaurants", searchRestaurants);
RestrudentRouter.put(
  "/updaterestrurant/:id",
  AuthAdmin,
  uploadStorage.single("image"),
  updateRestrurant
);
RestrudentRouter.get("/getorders/:id",OrderDetails)
export default RestrudentRouter;
