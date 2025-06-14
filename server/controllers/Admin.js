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


async function loginAdmin(req, res) {
  const { username, password } = req.body;
  try {
    console.log('Login attempt for:', username);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Request origin:', req.headers.origin);
    console.log('Request cookies:', req.cookies);
    
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Not all credentials are provided!", success: false });
    }
    const existingAdmin = await AdminModel.findOne({ username }).populate(
      "restrurant"
    );
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

    const adtoken = jwt.sign(
      {
        id: existingAdmin._id,
        type: existingAdmin.type
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    
    // More flexible cookie settings for production debugging
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    };

    // Add secure and sameSite based on environment and origin
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "None";
    } else {
      cookieOptions.secure = false;
      cookieOptions.sameSite = "Lax";
    }

    console.log('Setting cookie with options:', cookieOptions);
    
    res.cookie("adtoken", adtoken, cookieOptions);

    existingAdmin.password = "";

    console.log('Login successful for:', username);
    
    return res
      .status(200)
      .json({ 
        msg: "Login successfull", 
        success: true, 
        user: existingAdmin
      });
  } catch (error) {
    console.error('Login error:', error);
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
      file.buffer ? null : file.path,
      "Restrurant",
      file.buffer
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
        msg: "Admin not found!",
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
      msg: "Error while delete admin",
      success: false,
      error
    });
  }
}

async function getAdmin(req, res) {
  const id = req.id;
  try {
    const admin = await AdminModel.findById(id)
      .select("-password")
      .populate("restrurant");
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

async function logoutAdmin(req, res) {
  try {
    res.clearCookie('adtoken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/',
    });
    return res.status(200).json({ msg: "Logout successful", success: true });
  } catch (error) {
    console.error("Error while logging out user", error);
    return res
      .status(500)
      .json({ msg: "Error while logging out user", error, success: false });
  }
}

async function getAllAdmins(req, res) {
  try {
    const response = await AdminModel.find({ type: "admin" })
      .select("-password")
      .populate("restrurant");
    return res.status(200).json({
      msg: "All restrurants fetched",
      success: true,
      allRestrurants: response
    });
  } catch (error) {
    console.error("Error while finding admins", error);
    return res
      .status(500)
      .json({ msg: "Error while finding admins", error, success: false });
  }
}

async function updateAdmin(req, res) {
  const type = req.type;
  if (type !== "masteradmin") {
    return res
      .status(400)
      .json({ msg: "Not Master Admin!, Cannont access!", success: false });
  }
  const { adminid } = req.params;
  const { username, password, name, location } = req.body;
  const file = req.file;

  if (!username && !password && !name && !location && !file) {
    return res.status(400).json({ msg: "Nothing to update!", success: false });
  }
  try {
    const adminres = await AdminModel.findById(adminid);
    if (!adminres) {
      return res.status(400).json({ msg: "Admin not found!", success: false });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      adminres.password = hashedPassword;
    }
    if (username) adminres.username = username;

    const restrurantRes = await RestrudentModel.findById(adminres.restrurant);

    if (file) {
      await deleteImageFromCloudinary(restrurantRes.image);
      const cloudinaryResponse = await uploadOnCloudinary(
        file.buffer ? null : file.path,
        "Restrurant",
        file.buffer
      );
      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ msg: "File not uploaded on cloud", success: false });
      }
      restrurantRes.image = cloudinaryResponse.url;
    }
    if (location) restrurantRes.location = location;
    if (name) restrurantRes.name = name;
    await adminres.save();
    await restrurantRes.save();
    return res.status(200).json({
      msg: "Admin updated successfully",
      success: true,
      admin: adminres
    });
  } catch (error) {
    console.error("Error while updating admin", error);
    return res
      .status(500)
      .json({ msg: "Error while updating admin", error, success: false });
  }
}

export {
  registerAdmin,
  deleteAdmin,
  loginAdmin,
  getAdmin,
  logoutAdmin,
  getAllAdmins,
  updateAdmin
};
