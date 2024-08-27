import express from "express";
import { deleteAdmin, loginAdmin, registerAdmin } from "../controllers/Admin.js";
import uploadStorage from "../middleware/Multer.js";
const AdminRouter = express.Router();
AdminRouter.post(
  "/masteradmin/register",
  uploadStorage.single("image"),
  registerAdmin
);
AdminRouter.delete("/masteradmin/delete/:adminid", deleteAdmin);
AdminRouter.post("/admin/login", loginAdmin);
export default AdminRouter;
