import React, { useEffect, useState } from "react";
import { useAdminAuthentication } from "../../../store/Authentication";
const RestaurantDetail = () => {
  const { admin } = useAdminAuthentication();
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: [],
    location: "",
    geolocation: "",
    image: "",
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
          image: "",
          perThali: admin.restrurant.perThali || 300
        });
      }
    }
    if (admin !== null) getRestaurant();
  }, [admin]);

  useEffect(() => {
    console.log(restaurant);
  }, [restaurant]);

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
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            required
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
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetail;
