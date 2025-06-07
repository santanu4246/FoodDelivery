import FoodModel from "../models/FoodSchema.js";
import MenuModel from "../models/MenuModel.js";
import RestrurantModel from "../models/RestrudentModel.js";
import CartModel from "../models/CartModel.js";
import {
  uploadOnCloudinary,
  deleteImageFromCloudinary
} from "../utils/Cloudinary.js";

async function addFood(req, res) {
  const { title, description, price, isVegetarian } = req.body;

  try {
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const newFood = new FoodModel({
      name: title,
      description,
      price,
      veg: isVegetarian,
    });

    const savedFood = await newFood.save();

    await MenuModel.updateOne(
      { _id: req.params.menuid },
      { $push: { food: response._id } }
    );
    await menu.save();

    res.status(200).json({ msg: "Food added successfully", food: savedFood });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error while adding food", error: error.message });
  }
}
async function updateFood(req, res) {
  const { foodid } = req.params;
  const { foodName, foodPrice, starterType, isveg, prevStarterType, restuid, description } = req.body;
  
  console.log("Update food request:", { foodid, body: req.body });

  try {
    const foodItem = await FoodModel.findById(foodid);
    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    // Update food item fields
    if (foodName !== undefined) foodItem.name = foodName;
    if (foodPrice !== undefined) foodItem.price = parseFloat(foodPrice);
    if (isveg !== undefined) foodItem.veg = isveg === "true" || isveg === true;
    if (description !== undefined) foodItem.desc = description;

    await foodItem.save();
    
    // Handle menu category change if starterType is provided
    if (starterType && prevStarterType && prevStarterType !== starterType) {
      console.log("Moving food between menus:", { prevStarterType, starterType });
      
      const restaurant = await RestrurantModel.findById(restuid).populate("menu");
      if (!restaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }
      
      for (const menu of restaurant.menu) {
        if (menu.title === prevStarterType) {
          menu.food.pull(foodid);
          await menu.save();
          console.log(`Removed from ${prevStarterType}`);
        }
        if (menu.title === starterType) {
          menu.food.push(foodid);
          await menu.save();
          console.log(`Added to ${starterType}`);
        }
      }
    }
    
    res.status(200).json({ msg: "Food updated successfully", food: foodItem });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({
      msg: "Error while updating food",
      error: error.message,
    });
  }
}

async function deleteFood(req, res) {
  const { foodid } = req.params;
  try {
    const foodItem = await FoodModel.findById(foodid);
    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }
    await FoodModel.findByIdAndDelete(foodid);
    const menu = await MenuModel.findById(foodItem.menu);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }
    menu.food.pull(foodid);

    await menu.save();
    await CartModel.updateMany(
      { "items.foods._id": foodid },
      { $pull: { "items.$[].foods": { _id: foodid } } }
    );

    res.status(200).json({ msg: "Food deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error while deleting food", error: error.message });
  }
}

async function AddFoodToDatabase(req, res) {
  console.log("=== AddFoodToDatabase FUNCTION CALLED ===");
  
  try {
    console.log("=== AddFoodToDatabase START ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request body:", req.body);
    console.log("Request body type:", typeof req.body);
    console.log("Request body keys:", Object.keys(req.body || {}));
    console.log("File:", req.file);
    
    const { foodName, foodPrice, starterType, isVegetarian, restuid, description } = req.body;
    // Validation
    if (!foodName || !foodPrice || !starterType || !restuid) {
      return res.status(400).json({ 
        msg: "Missing required fields", 
        required: ["foodName", "foodPrice", "starterType", "restuid"],
        received: { foodName, foodPrice, starterType, restuid }
      });
    }

    const menu = await MenuModel.findById(starterType);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const restaurant = await RestrurantModel.findById(restuid);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    // Validate ObjectId format (temporarily disabled for debugging)
    console.log("Checking ObjectId formats:");
    console.log("starterType:", starterType, "type:", typeof starterType);
    console.log("restuid:", restuid, "type:", typeof restuid);
    
    if (!starterType || !starterType.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid starterType format");
      return res.status(400).json({ 
        msg: "Invalid menu ID format", 
        received: starterType,
        type: typeof starterType
      });
    }
    if (!restuid || !restuid.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid restuid format");
      return res.status(400).json({ 
        msg: "Invalid restaurant ID format", 
        received: restuid,
        type: typeof restuid
      });
    }

    console.log("Creating food with data:", {
      name: foodName,
      price: parseFloat(foodPrice),
      veg: isVegetarian === "true" || isVegetarian === true,
      menu: starterType,
      restaurant: restuid,
      desc: description || "",
      hasFile: !!req.file,
      fileInfo: req.file ? { filename: req.file.filename, size: req.file.size } : null
    });

    // Handle image upload to Cloudinary
    let imageUrl = null;
    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      try {
        // Handle memory storage (production)
        if (req.file.buffer) {
          console.log("Using file buffer for Cloudinary upload (production)");
          const cloudinaryResponse = await uploadOnCloudinary(
            null,
            "FoodItems",
            req.file.buffer
          );
          if (cloudinaryResponse) {
            imageUrl = cloudinaryResponse.url;
            console.log("Image uploaded to Cloudinary from buffer:", imageUrl);
          } else {
            console.log("Cloudinary buffer upload failed");
          }
        } 
        // Handle disk storage (development)
        else if (req.file.path) {
          console.log("Using file path for Cloudinary upload (development)");
          const cloudinaryResponse = await uploadOnCloudinary(
            req.file.path,
            "FoodItems"
          );
          if (cloudinaryResponse) {
            imageUrl = cloudinaryResponse.url;
            console.log("Image uploaded to Cloudinary from path:", imageUrl);
          } else {
            console.log("Cloudinary path upload failed");
          }
        }
      } catch (error) {
        console.log("Error uploading to Cloudinary:", error.message);
        imageUrl = null;
      }
    } else {
      console.log("No file uploaded - saving food without image");
    }

    const newFood = new FoodModel({
      name: foodName,
      price: parseFloat(foodPrice),
      veg: isVegetarian === "true" || isVegetarian === true,
      menu: starterType,
      restaurant: restuid,
      desc: description || "",
      image: imageUrl,
    });

    console.log("About to save food...");

    await newFood.save();
    console.log("Food saved successfully, ID:", newFood._id);
    
    menu.food.push(newFood._id);
    await menu.save();
    console.log("Menu updated successfully");
    
    res.status(200).json({
      msg: "Food added successfully",
      food: newFood,
      success: true
    });
  } catch (error) {
    console.error("=== AddFoodToDatabase ERROR ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    
    return res.status(500).json({
      msg: "Error while adding food",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      success: false
    });
  }
}

async function getFoodByMenuId(req, res) {
  try {
    const menuid = req.params.menuid;
    const menu = await MenuModel.findById(menuid);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }
    console.log(menu);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error while getting food" });
  }
}

async function getMenuWithFoodList(req, res) {
  const { restuid } = req.params;
  try {
    const menu = await RestrurantModel.findById(restuid)
      .populate("menu")
      .select("menu");
    let menuList = menu.menu.map((item) => ({
      title: item.title,
      menuid: item._id,
    }));
    for (const menu of menuList) {
      const foods = await FoodModel.find({ menu: menu.menuid.toString() });
      menu.foods = foods;
    }
    return res
      .status(200)
      .json({ msg: "Menu fetched successfully", menu: menuList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error while getting food" });
  }
}
async function getFoodByRestuId(req, res) {
  const { restuid } = req.params;
  try {
    const restaurant = await RestrurantModel.findById(restuid).populate({
      path: "menu",
      populate: {
        path: "food",
      },
    });

    const menuitems = restaurant.menu.map((item) => ({
      id: item._id,
      title: item.title,
      foods: item.food,
    }));
    res.status(200).json({ msg: "menu fecthed", menuitems: menuitems });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
}
export {
  addFood,
  getMenuWithFoodList,
  updateFood,
  deleteFood,
  AddFoodToDatabase,
  getFoodByMenuId,
  getFoodByRestuId,
};
