import RestrudentModel from "../models/RestrudentModel.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

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

export { getAllRestrudents, getRestrudentById, getAllLocations };
