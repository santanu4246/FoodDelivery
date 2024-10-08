import React, { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";
import UpdateFood from "./UpdateFood";
import DeleteFood from "./DeleteFood";
import DeleteMenu from "./DeleteMenu";

const EditFood = () => {
  const { getfoodbyrestuid } = useMenu();
  const [menuItems, setMenuItems] = useState([]);
  const [foodsItem, setfoodsItem] = useState([]);
  const [MenuItem, setMenuItem] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [isdelete, setisdelete] = useState(false);
  const [isdeleteMenu, setisdeleteMenu] = useState(false);
  const fetchMenuItems = async () => {
    try {
      const response = await getfoodbyrestuid();
      setMenuItems(response.menuitems);
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [getfoodbyrestuid]);

  const handelUpdate = (food, menuitem) => {
    setfoodsItem(food);
    setMenuItem(menuitem);
  };
  const handelDelete = (food) => {
    setfoodsItem(food);
  };
  const handelMenuDelete = (menuitem) =>{
    setMenuItem(menuitem);    
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Menu
      </h2>
      {menuItems.length > 0 ? (
        <div className="space-y-8">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex w-[50%] items-center gap-10 justify-between">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {menuItem.title}
              </h3>
              <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                handelMenuDelete(menuItem),
                setisdeleteMenu(true);
              }}
              >Delete</button>
              </div>
              {/* Vegetarian Foods */}
              <h4 className="text-lg font-semibold text-green-600 mb-2">
                Vegetarian
              </h4>
              <ul className="space-y-2 mb-4">
                {menuItem.foods
                  .filter((food) => food.veg)
                  .map((food, foodIndex) => (
                    <li
                      key={foodIndex}
                      className="flex items-center justify-between p-4 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      <span className="text-gray-600">
                        {food.name} - ₹{food.price}
                      </span>
                      <div className="flex gap-5">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 
                        rounded mr-2"
                          onClick={() => {
                            handelUpdate(food, menuItem);
                            setisUpdate(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setisdelete(true);
                            handelDelete(food);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>

              {/* Non-Vegetarian Foods */}
              <h4 className="text-lg font-semibold text-red-600 mb-2">
                Non-Vegetarian
              </h4>
              <ul className="space-y-2">
                {menuItem.foods
                  .filter((food) => !food.veg)
                  .map((food, foodIndex) => (
                    <li
                      key={foodIndex}
                      className="flex items-center justify-between p-4 bg-red-100 rounded-md hover:bg-red-200"
                    >
                      <span className="text-gray-600">
                        {food.name} - ₹{food.price}
                      </span>
                      <div className="flex gap-5">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2"
                          onClick={() => {
                            handelUpdate(food, menuItem);
                            setisUpdate(true);
                          }}
                        >
                          Update
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setisdelete(true);
                            handelDelete(food);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading menu items...</p>
      )}
      {isUpdate && (
        <UpdateFood
          foodItem={foodsItem}
          menuItem={MenuItem}
          fetchMenuItems={fetchMenuItems}
          onClose={() => setisUpdate(false)}
        />
      )}
      {isdelete && <DeleteFood foodItem={foodsItem} setisdelete={setisdelete} fetchMenuItems={fetchMenuItems}/>}
      {
        isdeleteMenu && <DeleteMenu MenuItem={MenuItem} fetchMenuItems={fetchMenuItems} setisdeleteMenu={setisdeleteMenu}/>
      }
    </div>
  );
};

export default EditFood;
