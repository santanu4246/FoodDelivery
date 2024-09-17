import MenuModel from "../models/MenuModel.js";
import RestrudentModel from "../models/RestrudentModel.js";
const addmenu = async (req, res) => {
  try {
    const { title, food } = req.body;
    const newmenu = new MenuModel({ title, food });
    const response = await newmenu.save();
    res
      .status(201)
      .json({ msg: "Menu added successfully", success: true, menu: response });
    await RestrudentModel.updateOne(
      { _id: req.params.id },
      { $push: { menu: response._id } }
    );
  } catch (error) {
    res.send({ msg: "Error while adding menu", success: false, error: error });
  }
};

const deletemenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    const menu = await MenuModel.findById(menuId);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found", success: false });
    }
    await MenuModel.findByIdAndDelete(menuId);
    await RestrudentModel.updateMany(
      { menu: menuId },
      { $pull: { menu: menuId } }
    );

    res.status(200).json({ msg: "Menu deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        msg: "Error while deleting menu",
        success: false,
        error: error.message,
      });
  }
};

export { addmenu,deletemenu };
