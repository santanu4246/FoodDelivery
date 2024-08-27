import RestrudentModel from "../models/RestrudentModel.js";
import AdminModel from "../models/AdminModel.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary
} from "../utils/Cloudinary.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/* masteradmin and admin route */
async function loginAdmin(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Not all credentials are provided!", success: false });
    }
    const existingAdmin = await AdminModel.findOne({ username });
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ msg: "Admin doesn't exist", success: false });
    }

    let isPassword;

    if (existingAdmin.type === "masteradmin") {
      isPassword = existingAdmin.password === password.trim();
    } else {
      isPassword = await bcrypt.compare(password, existingAdmin.password);
    }
    if (!isPassword) {
      return res
        .status(401)
        .json({ msg: "Incorrect password", success: false });
    }

    const token = jwt.sign(
      {
        id: existingAdmin._id,
        type: existingAdmin.type
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      path: "/admin",
      maxAge: 60 * 1000,
      secure: false,
      sameSite: "None"
    });

    existingAdmin.password = "";

    return res
      .status(200)
      .json({ msg: "Login successfull", success: true, user: existingAdmin });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Error while login admin", error, success: false });
  }
}
/* master admin route */
async function registerAdmin(req, res) {
  const type = req.type;
  if (type !== "masteradmin") {
    return res
      .status(400)
      .json({ msg: "Not Master Admin!, Cannont access!", success: false });
  }
  const { username, password, name, location } = req.body;
  const file = req.file;

  if (!username || !password || !name || !location || !file) {
    return res
      .status(400)
      .json({ msg: "Not all fields are provided!", success: false });
  }

  try {
    const existingUser = await AdminModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        msg: "Admin already exist with this username",
        success: false
      });
    }

    const cloudinaryResponse = await uploadOnCloudinary(
      file.path,
      "Restrurant"
    );
    if (!cloudinaryResponse)
      return res
        .status(500)
        .json({ msg: "File not uploaded on cloud", success: false });

    const newRestrurant = new RestrudentModel({
      name,
      location,
      image: cloudinaryResponse.url
    });
    const response = await newRestrurant.save();
    const hashedPassword = await bcrypt.hash(password, 8);
    const newAdmin = new AdminModel({
      username,
      password: hashedPassword,
      type: "admin",
      restrurant: response._id
    });
    const adminRes = await newAdmin.save();
    adminRes.password = "";
    return res.status(201).json({
      msg: "Admin register successfull",
      success: true,
      admin: adminRes
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while register admin",
      success: false,
      error
    });
  }
}

/* master admin route */
async function deleteAdmin(req, res) {
  const type = req.type;
  if (type !== "masteradmin") {
    return res
      .status(400)
      .json({ msg: "Not Master Admin!, Cannont access!", success: false });
  }
  const { adminid } = req.params;
  try {
    const adminsres = await AdminModel.findById(adminid).populate("restrurant");
    if (!adminsres) {
      return res.status(404).json({
        message: "Admin not found!",
        success: false
      });
    }

    if (adminsres.type === "masteradmin") {
      return res
        .status(400)
        .json({ msg: "Master Admin cannot be deleted!", success: false });
    }

    const imagelink = adminsres.restrurant.image;
    await deleteImageFromCloudinary(imagelink);
    await RestrudentModel.findByIdAndDelete(adminsres.restrurant._id);
    const deletedAdmin = await AdminModel.findByIdAndDelete(adminid);
    return res.status(200).json({
      msg: "Admin deleted successfully",
      success: true,
      admin: deletedAdmin
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while delete admin",
      success: false,
      error
    });
  }
}

async function getAdmin(req, res) {
  const id = req.id;
  try {
    const admin = await AdminModel.findById(id).select("-password");
    if (!admin) {
      return res.status(400).json({ msg: "admin not found!", success: false });
    }
    return res
      .status(200)
      .json({ msg: "Admin fetched successfully", success: true, admin });
  } catch (error) {
    console.error("Error while finding user", error);
    return res
      .status(500)
      .json({ msg: "Error while finding user", error, success: false });
  }
}

export { registerAdmin, deleteAdmin, loginAdmin, getAdmin };
