import React, { useEffect, useState } from "react";
import UpdateFood from "./UpdateFood";
import { useMenu } from "../../../store/Menu";
import DeleteFood from "./DeleteFood";
import NewAddFood from "./NewAddFood";

function EditFood() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [deleteClick, setDeleteClick] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const [addFood, setAddFood] = useState(false);
  const [menuId, setMenuId] = useState("");

  const handleUpdateClick = (food, menuId) => {
    food.menuId = menuId;
    setSelectedFood(food);
  };

  const closeUpdateForm = () => {
    setSelectedFood(null);
  };

  const { getMenu, menuList, deleteMenu } = useMenu();
  console.log(menuList);
  
  useEffect(() => {
    const restuid = localStorage.getItem("restrurantID");
    if (restuid) {
      getMenu(restuid);
    }
  }, [getMenu]);

  const handleDeleteClick = (food, menuId) => {
    food.menuId = menuId;
    setFoodToDelete(food);
    setDeleteClick(true);
  };

  const deletemenu = async (menuId) => {
    await deleteMenu(menuId);
  };

  const handleAddFood = (menuId) => {
    setAddFood(true);
    setMenuId(menuId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col items-center p-8">
      {menuList.map((item) => (
        <div
          key={item._id}
          className="w-full bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-center text-indigo-900 mb-4">
            {item.title}
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => deletemenu(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Delete Menu
            </button>
            <button
              onClick={() => handleAddFood(item._id)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Add Food
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {item.food.map((food) => (
              <div
                key={food._id}
                className="bg-indigo-50 p-6 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                    {food.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{food.description}</p>
                  <p className="text-lg font-semibold text-gray-600">
                    ₹{food.price}
                  </p>
                </div>

                <div className="mt-4 flex justify-around">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => handleUpdateClick(food, item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => handleDeleteClick(food, item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {deleteClick && (
        <DeleteFood
          food={foodToDelete}
          onDelete={() => {
            setDeleteClick(false);
            setFoodToDelete(null);
          }}
        />
      )}

      {selectedFood && (
        <UpdateFood food={selectedFood} onClose={closeUpdateForm} />
      )}

      {addFood && (
        <NewAddFood onClose={() => setAddFood(false)} menuId={menuId} />
      )}
    </div>
  );
}

export default EditFood;
