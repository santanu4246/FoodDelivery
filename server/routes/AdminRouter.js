import express from "express";
import {
  deleteAdmin,
  getAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin
} from "../controllers/Admin.js";
import uploadStorage from "../middleware/Multer.js";
import AuthAdmin from "../middleware/AuthAdmin.js";
const AdminRouter = express.Router();
AdminRouter.post(
  "/masteradmin/register",
  AuthAdmin,
  uploadStorage.single("image"),
  registerAdmin
);
AdminRouter.delete("/masteradmin/delete/:adminid", AuthAdmin, deleteAdmin);
AdminRouter.post("/admin/login", loginAdmin);
AdminRouter.get("/getadmin", AuthAdmin, getAdmin);
AdminRouter.get("/admin/logout",logoutAdmin)
export default AdminRouter;
