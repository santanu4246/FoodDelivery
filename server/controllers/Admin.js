import RestrudentModel from "../models/RestrudentModel.js";
import AdminModel from "../models/AdminModel.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary
} from "../utils/Cloudinary.js";
import bcrypt from "bcryptjs";

/* master admin route */
async function registerAdmin(req, res) {
  const { username, password, name, location } = req.body;
  const file = req.file;
  console.log(username, password, name, location, file);

  if (!username || !password || !name || !location || !file) {
    return res
      .status(400)
      .json({ msg: "Not all fields are provided!", success: false });
  }

  try {
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
  const { adminid } = req.params;
  try {
    const adminsres = await AdminModel.findById(adminid).populate("restrurant");
    if (!adminsres) {
      return res.status(404).json({
        message: "Admin not found!",
        success: false
      });
    }
    const imagelink = adminsres.restrurant.image;
    await deleteImageFromCloudinary(imagelink);
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

export { registerAdmin, deleteAdmin };
