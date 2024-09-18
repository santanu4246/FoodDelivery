import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAdminAuthentication } from "../../../store/Authentication";
import { BeatLoader } from "react-spinners";
const RestaurantDetail = () => {
  const { admin, updateRestrurant, isLoading } = useAdminAuthentication();
  const [image, setImage] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: [],
    location: "",
    geolocation: "",
    perThali: 100
  });

  useEffect(() => {
    function getRestaurant() {
      if (admin.restrurant) {
        setRestaurant({
          name: admin.restrurant.name || "",
          cuisine: admin.restrurant.cuisine || [],
          location: admin.restrurant.location || "",
          geolocation: admin.restrurant.geolocation || "",
          perThali: admin.restrurant.perThali || 300
        });
      }
    }
    if (admin !== null) getRestaurant();
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({
      ...restaurant,
      [name]: value
    });
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;
    setRestaurant({
      ...restaurant,
      cuisine: value.split(",")
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (restaurant.name !== "") formData.append("name", restaurant.name);
    if (restaurant.cuisine.length > 0)
      formData.append("cuisine", restaurant.cuisine);
    if (restaurant.location !== "")
      formData.append("location", restaurant.location);
    if (restaurant.perThali !== "")
      formData.append("perThali", restaurant.perThali);
    if (restaurant.geolocation !== "")
      formData.append("geolocation", restaurant.geolocation);
    if (image !== null) formData.append("image", image);
    try {
      await updateRestrurant(admin.restrurant._id, formData);
      
      toast.success("Admin updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
      >
        <h3 className="text-2xl font-semibold mb-4">Update Restaurant</h3>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Cuisine:</span>
          <input
            type="text"
            name="cuisine"
            value={restaurant.cuisine.join(",")}
            onChange={handleCuisineChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Location:</span>
          <input
            type="text"
            name="location"
            value={restaurant.location}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Geolocation:</span>
          <input
            type="text"
            name="geolocation"
            value={restaurant.geolocation}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Image</span>
          <input
            type="file"
            name="image"
            value={restaurant.image}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Per Thali:</span>
          <input
            type="number"
            name="perThali"
            value={restaurant.perThali}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            min="0"
          />
        </label>
        <button
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? (
            <BeatLoader size={7} color="#ffffff" />
          ) : (
            <span>Update Restaurant</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetail;
