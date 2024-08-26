import RestrudentModel from "../models/RestrudentModel.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

async function addRestrudent(req, res) {
  try {
    const { name, cuisine, location, geolocation, perThali, rating } = req.body;
    const file = req.file;

    if (!file || !name || !location) {
      return res
        .status(400)
        .json({ msg: "not all required fileds are provided", success: false });
    }

    const cloudinaryResponse = await uploadOnCloudinary(
      file.path,
      "Restrurant"
    );

    if (!cloudinaryResponse)
      return res
        .status(500)
        .json({ msg: "File not uploaded on cloud", success: false });

    const newRestaurant = new RestrudentModel({
      name,
      location,
      image: cloudinaryResponse.url,
      cuisine: cuisine || [],
      geolocation: geolocation || "",
      perThali: perThali || 100,
      rating: rating || 0
    });

    const response = await newRestaurant.save();
    return res.status(201).json({
      msg: "New restrurant added",
      success: true,
      restrurant: response
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the restaurant" });
  }
}
async function updateRestrudent(req, res) {}
async function deleteRestrudent(req, res) {}
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

export {
  addRestrudent,
  updateRestrudent,
  deleteRestrudent,
  getAllRestrudents,
  getRestrudentById
};
