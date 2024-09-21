import FoodModel from "../models/FoodSchema.js";
import MenuModel from "../models/MenuModel.js";
import RestrurantModel from "../models/RestrudentModel.js";

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
      veg: isVegetarian
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
  const { title, description, price, isVegetarian } = req.body;

  try {
    const foodItem = await FoodModel.findById(foodid);
    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    if (title) foodItem.name = title;
    if (description) foodItem.description = description;
    if (price) foodItem.price = price;
    if (isVegetarian !== undefined) foodItem.veg = isVegetarian;

    await foodItem.save();

    res.status(200).json({ msg: "Food updated successfully", food: foodItem });
  } catch (error) {
    res.status(500).json({
      msg: "Error while updating food",
      error: error.message
    });
  }
}
async function deleteFood(req, res) {
  const { menuid, foodid } = req.params;
  try {
    const menu = await MenuModel.findById(menuid);
    if (!menu) {
      return res.json({ msg: "Menu not found" });
    }

    const foodItem = await FoodModel.findById(foodid);
    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    // Remove the food reference from MenuModel
    menu.food.pull(foodid);
    await menu.save();

    // Delete the food item from FoodModel
    await FoodModel.findByIdAndDelete(foodid);

    res.status(200).json({ msg: "Food deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error while deleting food", error: error.message });
  }
}

async function AddFoodToDatabase(req, res) {
  const { foodName, foodPrice, starterType, isVegetarian, restuid } = req.body;
  console.log(foodName, foodPrice, starterType, isVegetarian);
  try {
    const menu = await MenuModel.findById(starterType);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const newFood = new FoodModel({
      name: foodName,
      price: foodPrice,
      veg: isVegetarian,
      menu: starterType,
      restaurant: restuid
    });

    await newFood.save();
    menu.food.push(newFood._id);
    await menu.save();
    res.status(200).json({
      msg: "Food added successfully",
      food: newFood
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error while adding food",
      error: error.message
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
      menuid: item._id
    }));
    for (const menu of menuList) {
      const foods = await FoodModel.find({ menu: menu.menuid.toString() });
      menu.foods = foods;
    }
    return res.status(200).json({ msg: "Menu fetched successfully", menu: menuList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error while getting food" });
  }
}

export {
  addFood,
  getMenuWithFoodList,
  updateFood,
  deleteFood,
  AddFoodToDatabase,
  getFoodByMenuId
};
