import React from "react";
import { useMenu } from "../../../store/Menu";

const DeleteFood = ({ foodItem, setisdelete,fetchMenuItems }) => {
  const { deleteFood } = useMenu();
  const onClose = () => {
    setisdelete(false);
  };
  const handleDelete = async (foodid) => {
    try {
      await deleteFood(foodid);
      onClose()
      await fetchMenuItems()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="text-black max-w-sm mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete "{foodItem.name}"?
        </h2>
        <div className="flex justify-around">
          <button
            onClick={() => handleDelete(foodItem._id)}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFood;
