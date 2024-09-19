import React, { useEffect, useState } from "react";
import UpdateFood from "./UpdateFood";
import { useMenu } from "../../../store/Menu";
import DeleteFood from "./DeleteFood";
import NewAddFood from "./NewAddFood";

function EditFood() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [deleteClick, setDeleteClick] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null); // Track which food to delete
  const [addfood, setaddfood] = useState(false)
  const [MenuId, setMenuId] = useState('')
  const handleUpdateClick = (food, menuid) => {
    food.menuid = menuid;
    setSelectedFood(food);
  };

  const closeUpdateForm = () => {
    setSelectedFood(null);
  };

  const { getMenu, menuList, deleteMenu } = useMenu();
  useEffect(() => {
    const restuid = localStorage.getItem("restrurantID");
    if (restuid) {
      getMenu(restuid);
    }
  }, [getMenu]);

  const handleDeleteClick = (food, menuid) => {
    food.menuid = menuid;
    setFoodToDelete(food);
    setDeleteClick(true);
  };

  const deletemenu = async (menuid) => {
    await deleteMenu(menuid);
  };

  const handelAddFood = (menuid) => {
    setaddfood(true)
    setMenuId(menuid)
  }
  return (
    <div className="text-gray-900 min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex flex-col items-center p-8">
      {menuList.map((item) => (
        <div key={`${item._id}-${item.name}`} className="w-full mb-12">
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
            {item.title}
          </h1>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => deletemenu(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Delete Menu
            </button>
            <button onClick={()=>handelAddFood(item._id)}>Add Food</button>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {item.food.map((food) => (
              <div
                key={`${food.id}-${food.name}`}
                className="h-auto w-[300px] bg-white rounded-lg shadow-lg flex flex-col items-center p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="img h-[150px] w-[150px] bg-gray-100 rounded-full overflow-hidden border-4 border-indigo-300">
                  <img
                    src={food.imageUrl || "/placeholder-image.jpg"}
                    alt={`${food.name} Image`}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {food.name}
                  </h2>
                  <p className="text-gray-500 mt-2">{food.description}</p>
                  <p className="text-green-500 mt-2 font-semibold">
                    ₹{food.price}
                  </p>
                </div>

                <div className="flex justify-between w-full mt-8 px-4 gap-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => handleUpdateClick(food, item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    onClick={() => handleDeleteClick(food, item._id)} // Attach deleteClick handler
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
            console.log(`${foodToDelete.name} deleted`);
            setDeleteClick(false);
            setFoodToDelete(null);
          }}
        />
      )}

      {selectedFood && (
        <UpdateFood food={selectedFood} onClose={closeUpdateForm} />
      )}

      {
        addfood && (
          <NewAddFood onClose={() => setaddfood(false)} MenuId={MenuId}/>
        )
      }
    </div>
  );
}

export default EditFood;
