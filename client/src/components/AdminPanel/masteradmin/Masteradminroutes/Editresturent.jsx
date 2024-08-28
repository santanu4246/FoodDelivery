import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAdminAuthentication } from "../../../../store/Authentication";
import { BeatLoader } from "react-spinners";

const Editresturent = ({ Resturent, onClose }) => {
  const { updateAdmin, isLoading, getAllRestrurants } =
    useAdminAuthentication();
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    username: Resturent.username,
    password: "",
    name: Resturent.name,
    location: Resturent.location,
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedRestaurant((prev) => ({ ...prev, image: file }));
  };

  const handleSave = async () => {
    if (
      updatedRestaurant.username == "" &&
      updatedRestaurant.password == "" &&
      updatedRestaurant.name == "" &&
      updatedRestaurant.location == "" &&
      updatedRestaurant.image == null
    ) {
      toast.warn("Nothing to update!");
      return;
    }
    const formData = new FormData();
    if (updatedRestaurant.username !== "")
      formData.append("username", updatedRestaurant.username);
    if (updatedRestaurant.password !== "")
      formData.append("password", updatedRestaurant.password);
    if (updatedRestaurant.name !== "")
      formData.append("name", updatedRestaurant.name);
    if (updatedRestaurant.location !== "")
      formData.append("location", updatedRestaurant.location);
    if (updatedRestaurant.image !== null)
      formData.append("image", updatedRestaurant.image);

    try {
      const reponse = await updateAdmin(formData, Resturent.adminID);
      toast.success(reponse);
      getAllRestrurants();
      onClose();
    } catch (error) {
      toast.warn(error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Edit Restaurant</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={updatedRestaurant.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={updatedRestaurant.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={updatedRestaurant.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={updatedRestaurant.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            onClick={onClose}
          >
            {isLoading ? (
              <BeatLoader size={7} color="#ffffff" />
            ) : (
              <span>Cancel</span>
            )}
          </button>
          <button
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            {isLoading ? (
              <BeatLoader size={7} color="#ffffff" />
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editresturent;
