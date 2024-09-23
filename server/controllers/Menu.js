import MenuModel from "../models/MenuModel.js";
import RestrudentModel from "../models/RestrudentModel.js";
const addmenu = async (req, res) => {
  try {
    const { title } = req.body;
    const newmenu = new MenuModel({ title });
    const response = await newmenu.save();
    console.log(response);
    console.log(req.params.restaurantId);

    res.status(201).json({
      msg: "Menu added successfully",
      success: true,
      menu: response
    });

    await RestrudentModel.updateOne(
      { _id: req.params.restaurantId },
      { $push: { menu: response._id } }
    );
  } catch (error) {
    res.status(500).json({
      msg: "Error while adding menu",
      success: false,
      error: error.message
    });
  }
};

const deletemenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await MenuModel.findById(id);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found", success: false });
    }

    await MenuModel.findByIdAndDelete(id);

    await RestrudentModel.updateMany({ menu: id }, { $pull: { menu: id } });

    res.status(200).json({ msg: "Menu deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      msg: "Error while deleting menu",
      success: false,
      error: error.message
    });
  }
};

const getmenu = async (req, res) => {
  const { restuid } = req.params;

  try {
    const restrudent = await RestrudentModel.findById(restuid);

    if (!restrudent) {
      return res
        .status(404)
        .json({ msg: "Restaurant not found", success: false });
    }

    // Populate the menu's food array with details from FoodModel
    const menus = await MenuModel.find({
      _id: { $in: restrudent.menu }
    }).populate("food");

    res
      .status(200)
      .json({ msg: "Menu fetched successfully", success: true, menu: menus });
  } catch (error) {
    res.status(500).json({
      msg: "Error while fetching menu",
      success: false,
      error: error.message
    });
  }
};

async function getMenuList(req, res) {
  const { restuid } = req.params;
  try {
    const response = await RestrudentModel.findById(restuid)
      .populate("menu")
      .select("menu");
      console.log(response);
      
    return res.status(200).json({ menu: response.menu });
  } catch (error) {
    console.log(error);
  }
}

export { addmenu, deletemenu, getmenu, getMenuList };
