import React, { useEffect, useState } from "react";
import UpdateFood from "./UpdateFood";
import { useMenu } from "../../../store/Menu";
import DeleteFood from "./DeleteFood";

function EditFood() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [deleteClick, setDeleteClick] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null); // Track which food to delete

  const handleUpdateClick = (food, menuid) => {
    food.menuid = menuid;
    setSelectedFood(food);
  };

  const closeUpdateForm = () => {
    setSelectedFood(null);
  };

  const { getMenu, menuList,deleteMenu } = useMenu();
  useEffect(() => {
    const restuid = localStorage.getItem("restrurantID");
    if (restuid) {
      getMenu(restuid);
    }
  }, [getMenu]);

  const handleDeleteClick = (food,menuid) => {
    food.menuid = menuid;
    setFoodToDelete(food); 
    setDeleteClick(true); 
  };
  const deletemenu = async (menuid)=>{
    await deleteMenu(menuid)
  }
  return (
    <div className="text-black min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col items-center p-6">
      {menuList.map((item) => (
        <div key={`${item._id}-${item.name}`} className="w-full mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">{item.title}</h1>
          <button onClick={()=> deletemenu(item._id)}>DeleteMenu</button>
          {/* Display foods in a row (horizontally) */}
          <div className="flex flex-wrap justify-center gap-6">
            {item.food.map((food) => (
              <div
                key={`${food.id}-${food.name}`}
                className="h-auto w-[300px] bg-white rounded-lg shadow-lg flex flex-col items-center p-6"
              >
                <div className="img h-[150px] w-[150px] bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={food.imageUrl || "/placeholder-image.jpg"}
                    alt={`${food.name} Image`}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {food.name}
                  </h2>
                  <p className="text-gray-500 mt-2">{food.description}</p>
                  <p className="text-green-500 mt-2 font-semibold">
                    {food.price}
                  </p>
                </div>

                <div className="flex justify-between w-full mt-8 px-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
                    onClick={() => handleUpdateClick(food, item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
                    onClick={() => handleDeleteClick(food,item._id)} // Attach deleteClick handler
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {
        deleteClick &&  (
            <DeleteFood food={foodToDelete}  onDelete={() => {
              console.log(`${foodToDelete.name} deleted`);
              setDeleteClick(false);
              setFoodToDelete(null);
            }} />
        )
      }
      {selectedFood && (
        <UpdateFood food={selectedFood} onClose={closeUpdateForm} />
      )}
    </div>
  );
}

export default EditFood;
