import React from "react";
import { useMenu } from "../../../store/Menu";

const DeleteFood = ({ food, onDelete }) => {
  const { deleteFood, getMenu } = useMenu();

  const handleDelete = async () => {
    await deleteFood(food.menuid, food._id);

    const restrurantID = localStorage.getItem("restrurantID");
    await getMenu(restrurantID); // Refetch menu after deletion
    onDelete();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onDelete();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Delete {food.name}?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
            onClick={onDelete}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFood;
