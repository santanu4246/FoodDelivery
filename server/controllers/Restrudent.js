import RestrudentModel from "../models/RestrudentModel.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary
} from "../utils/Cloudinary.js";

async function getAllRestrudents(req, res) {
  try {
    const response = await RestrudentModel.find({});
    return res.status(201).json({
      msg: "All restrurants fetched",
      success: true,
      restrurant: response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching all the restaurants"
    });
  }
}
async function getRestrudentById(req, res) {
  const { id } = req.params;
  try {
    const response = await RestrudentModel.findById(id);
    if (!response) {
      return res
        .status(400)
        .json({ msg: "Restrurant not found!", success: false });
    }
    return res.status(200).json({
      msg: "Restrurant fetch successfull",
      success: true,
      restrurant: response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching all the restaurants"
    });
  }
}

async function getAllLocations(req, res) {
  try {
    const restaurants = await RestrudentModel.find({}).select("location");
    const locationSet = [...new Set(restaurants.map(item => item.location))];
    return res.status(200).json({
      locations: locationSet
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while finding all locations",
      success: false,
      error: error.message
    });
  }
}

async function setLocation(req, res) {
  try {
    const location = req.body.location;
    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }
    res.cookie("location", JSON.stringify(location), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: "Location set successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getRestrurantByLocation(req, res) {
  let location = req.cookies.location;
  // if (!location)
  //   return res
  //     .status(400)
  //     .json({ msg: "Location cookie not found!", success: false });
  try {
    const restrurantList = await RestrudentModel.find({
      location: location ? location.slice(1, -1) : "Bankura"
    });
    return res.status(200).json({
      msg: "Restrurants feched by location",
      success: false,
      restrurantList
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while finding restrurant by location",
      success: false,
      error: error.message
    });
  }
}

async function updateRestrurant(req, res) {
  const { id } = req.params;
  const file = req.file;
  const { name, location, geolocation, cuisine, perThali } = req.body;
  if (!file && !name && !location && !geolocation && !cuisine && !perThali) {
    return res.status(400).json({
      msg: "Not all things are provided!",
      success: false
    });
  }
  try {
    const restrurantRes = await RestrudentModel.findById(id);
    if (!restrurantRes) {
      return res.status(400).json({
        msg: "Restrurant not found!",
        success: false
      });
    }
    if (file) {
      await deleteImageFromCloudinary(restrurantRes.image);
      const cloudinaryResponse = await uploadOnCloudinary(
        file.path,
        "Restrurant"
      );
      if (!cloudinaryResponse)
        return res
          .status(500)
          .json({ msg: "File not uploaded on cloud", success: false });
      restrurantRes.image = cloudinaryResponse.url;
    }
    if (name) restrurantRes.name = name;
    if (location) restrurantRes.location = location;
    if (geolocation) restrurantRes.geolocation = geolocation;
    if (perThali) restrurantRes.perThali = perThali;
    if (cuisine) restrurantRes.cuisine = cuisine.split(",").map(String);
    await restrurantRes.save();
    return res.status(200).json({
      msg: "Restrurant updated successfully",
      success: true,
      restrurant: restrurantRes
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while updating restrurant!",
      success: false,
      error: error.message
    });
  }
}

export {
  getAllRestrudents,
  getRestrudentById,
  getAllLocations,
  setLocation,
  getRestrurantByLocation,
  updateRestrurant
};
