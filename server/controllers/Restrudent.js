import OrderModel from "../models/OrderModel.js";
import RestrudentModel from "../models/RestrudentModel.js";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/Cloudinary.js";

async function getAllRestrudents(req, res) {
  try {
    const response = await RestrudentModel.find({});
    return res.status(201).json({
      msg: "All restrurants fetched",
      success: true,
      restrurant: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching all the restaurants",
    });
  }
}
async function getRestrudentById(req, res) {
  const { id } = req.params;
  try {
    const response = await RestrudentModel.findById(id).populate("menu");
    if (!response) {
      return res
        .status(400)
        .json({ msg: "Restrurant not found!", success: false });
    }
    return res.status(200).json({
      msg: "Restrurant fetch successfull",
      success: true,
      restrurant: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching all the restaurants",
    });
  }
}

async function getAllLocations(req, res) {
  try {
    const restaurants = await RestrudentModel.find({}).select("location");
    const locationSet = [...new Set(restaurants.map((item) => item.location))];
    return res.status(200).json({
      locations: locationSet,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while finding all locations",
      success: false,
      error: error.message,
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
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
      location: location ? location.slice(1, -1) : "Bankura",
    });
    return res.status(200).json({
      msg: "Restrurants feched by location",
      success: false,
      restrurantList,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while finding restrurant by location",
      success: false,
      error: error.message,
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
      success: false,
    });
  }
  try {
    const restrurantRes = await RestrudentModel.findById(id);
    if (!restrurantRes) {
      return res.status(400).json({
        msg: "Restrurant not found!",
        success: false,
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
      restrurant: restrurantRes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while updating restrurant!",
      success: false,
      error: error.message,
    });
  }
}
async function searchRestaurants(req, res) {
  const searchTerm = req.query.search?.trim().toLowerCase() || ""; // Extract, trim, and convert the search term to lowercase

  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term cannot be empty",
      results: [],
    });
  }

  try {
    // Fetch all restaurants and filter manually (no $regex, using strict filtering)
    const results = await RestrudentModel.find({});

    // Filter restaurants by partial matching (case-insensitive) manually
    const filteredResults = results.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm)
    );
    console.log(filteredResults);
    
    if (filteredResults.length === 0) {
      return res.json({
        success: false,
        message: "No restaurants found",
        results: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      results: filteredResults,
    });
  } catch (error) {
    console.error("Error while searching restaurants: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function OrderDetails(req,res) {
  const { id } = req.params;
try {
    const orderDetails = await OrderModel.find({restaurant:id})
    res.status(200).json({msg:"Order Details",orderDetails})
} catch (error) {
  res.json({msg:"error while fething orderDetails",error})
}

}
export {
  getAllRestrudents,
  getRestrudentById,
  getAllLocations,
  setLocation,
  getRestrurantByLocation,
  updateRestrurant,
  searchRestaurants,
  OrderDetails
};
