import MenuModel from "../models/MenuModel.js";
import RestrudentModel from "../models/RestrudentModel.js";
const addmenu = async (req, res) => {
    try {
        const { title, food } = req.body;
        const newmenu = new MenuModel({ title, food });
        const response = await newmenu.save();
        res.status(201).json({ msg: "Menu added successfully", success: true, menu: response });
        await RestrudentModel.updateOne({ _id: req.params.id }, { $push: { menu: response._id } });
    } catch (error) {
        res.send({ msg: "Error while adding menu", success: false, error: error });
    }

}

export { addmenu}