import express from "express";
import {
  addRestrudent,
  deleteRestrudent,
  getAllRestrudents,
  getRestrudentById,
  updateRestrudent
} from "../controllers/Restrudent.js";
import uploadStorage from "../middleware/Multer.js";
const RestrudentRouter = express.Router();
RestrudentRouter.post(
  "/addrestrudent",
  uploadStorage.single("image"),
  addRestrudent
);
RestrudentRouter.put(
  "/updaterestrudent",
  uploadStorage.single("image"),
  updateRestrudent
);
RestrudentRouter.delete("/deleterestrudent", deleteRestrudent);
RestrudentRouter.get("/getallrestrurants", getAllRestrudents);
RestrudentRouter.get("/getrestrurantbyid/:id", getRestrudentById);
export default RestrudentRouter;
