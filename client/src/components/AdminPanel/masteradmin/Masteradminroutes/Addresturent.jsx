import React, { useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useAdminAuthentication } from "../../../../store/Authentication.js";

const AddRestaurant = () => {
  const { registerAdmin, isLoading } = useAdminAuthentication();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null); // Changed from empty string to null
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState(""); // New state for password
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !image || !username || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("location", location);
      formData.append("image", image);
      const response = await registerAdmin(formData);
      toast.success(response?.msg);
      setName("");
      setLocation("");
      setImage(null);
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      toast.warning(error.response?.data?.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Create a New Restaurant
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Restaurant Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter restaurant name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter restaurant location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        {/* Username Field */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        <button
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? (
            <BeatLoader size={7} color="#ffffff" />
          ) : (
            <span>Create Restaurant</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
