import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !image) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const restaurantData = { name, location, image, cuisine: cuisine.split(',') };
      console.log('Restaurant Data:', restaurantData);

      // Replace with actual API call
      // const response = await axios.post('/api/restaurants', restaurantData);

      setName('');
      setLocation('');
      setImage('');
      setCuisine('');
      setError('');

      alert('Restaurant created successfully!');
    } catch (error) {
      console.error('Error creating restaurant:', error);
      setError('Failed to create restaurant. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create a New Restaurant</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
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
          <label htmlFor="location" className="block text-lg font-semibold text-gray-700 mb-2">
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
          <label htmlFor="image" className="block text-lg font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cuisine" className="block text-lg font-semibold text-gray-700 mb-2">
            Cuisine (Comma separated)
          </label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Enter cuisines, e.g., Indian, Italian"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
