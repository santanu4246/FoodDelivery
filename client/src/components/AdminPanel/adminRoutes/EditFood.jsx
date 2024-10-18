import React, { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";
import UpdateFood from "./UpdateFood";
import DeleteFood from "./DeleteFood";
import DeleteMenu from "./DeleteMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";

const EditFood = () => {
  const { getfoodbyrestuid } = useMenu();
  const [menuItems, setMenuItems] = useState([]);
  const [foodsItem, setfoodsItem] = useState([]);
  const [MenuItem, setMenuItem] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [isdelete, setisdelete] = useState(false);
  const [isdeleteMenu, setisdeleteMenu] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const fetchMenuItems = async () => {
    try {
      const response = await getfoodbyrestuid();
      setMenuItems(response.menuitems);

      // Initialize expandedMenus state for each menu category separately
      const initialExpanded = {};
      response.menuitems.forEach((item) => {
        initialExpanded[item._id] = { veg: false, nonVeg: false }; // Track vegetarian and non-veg sections individually
      });
      setExpandedMenus(initialExpanded);
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [getfoodbyrestuid]);

  // Toggle specific menu sections (vegetarian or non-vegetarian) inside a menu
  const toggleMenuSection = (menuId, section) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuId]: {
        ...prevState[menuId],
        [section]: !prevState[menuId][section],
      },
    }));
  };

  const handelUpdate = (food, menuitem) => {
    setfoodsItem(food);
    setMenuItem(menuitem);
    setisUpdate(true);
  };

  const handelDelete = (food) => {
    setfoodsItem(food);
    setisdelete(true);
  };

  const handelMenuDelete = (menuitem) => {
    setMenuItem(menuitem);
    setisdeleteMenu(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
        </div>

        {menuItems.length > 0 ? (
          <div className="space-y-6">
            {menuItems.map((menuItem, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="bg-white border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">
                      {menuItem.title}
                    </CardTitle>
                    <button
                      onClick={() => handelMenuDelete(menuItem)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Menu
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Vegetarian Section */}
                  <div className="mb-8">
                    <h4
                      className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4 cursor-pointer"
                      onClick={() => toggleMenuSection(menuItem._id, "veg")}
                    >
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      Vegetarian Items
                      {expandedMenus[menuItem._id]?.veg ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </h4>
                    {expandedMenus[menuItem._id]?.veg && (
                      <div className="space-y-3">
                        {menuItem.foods
                          .filter((food) => food.veg)
                          .map((food, foodIndex) => (
                            <div
                              key={foodIndex}
                              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-green-200 transition-all duration-200 group"
                            >
                              <div>
                                <h5 className="font-medium text-gray-800">
                                  {food.name}
                                </h5>
                                <p className="text-green-600 font-medium">
                                  ₹{food.price}
                                </p>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handelUpdate(food, menuItem)}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handelDelete(food)}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Non-Vegetarian Section */}
                  <div>
                    <h4
                      className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4 cursor-pointer"
                      onClick={() => toggleMenuSection(menuItem._id, "nonVeg")}
                    >
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      Non-Vegetarian Items
                      {expandedMenus[menuItem._id]?.nonVeg ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </h4>
                    {expandedMenus[menuItem._id]?.nonVeg && (
                      <div className="space-y-3">
                        {menuItem.foods
                          .filter((food) => !food.veg)
                          .map((food, foodIndex) => (
                            <div
                              key={foodIndex}
                              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-red-200 transition-all duration-200 group"
                            >
                              <div>
                                <h5 className="font-medium text-gray-800 capitalize">
                                  {food.name}
                                </h5>
                                <p className="text-red-600 font-medium">
                                  ₹{food.price}
                                </p>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handelUpdate(food, menuItem)}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handelDelete(food)}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">No menu items found</p>
              <p className="text-sm text-gray-500">
                Start by adding a new menu section
              </p>
            </div>
          </Card>
        )}

        {/* Update/Delete Popups */}
        {isUpdate && (
          <UpdateFood
            foodItem={foodsItem}
            menuItem={MenuItem}
            fetchMenuItems={fetchMenuItems}
            onClose={() => setisUpdate(false)}
          />
        )}
        {isdelete && (
          <DeleteFood
            foodItem={foodsItem}
            setisdelete={setisdelete}
            fetchMenuItems={fetchMenuItems}
          />
        )}
        {isdeleteMenu && (
          <DeleteMenu
            MenuItem={MenuItem}
            fetchMenuItems={fetchMenuItems}
            setisdeleteMenu={setisdeleteMenu}
          />
        )}
      </div>
    </div>
  );
};

export default EditFood;
