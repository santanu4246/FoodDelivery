import React, { useState } from 'react';
import axios from 'axios';

const Addresturent = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [cuisine, setCuisine] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !image) {
      setError('Please fill out all required fields.');
      return;
    }

    console.log({name,location,image,cuisine});
    
    setName('')
    setLocation('')
    setImage('')
    setCuisine('')
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a New Restaurant</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter restaurant name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter restaurant location"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisine">
            Cuisine (Comma separated)
          </label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value.split(','))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter cuisines, e.g., Indian, Italian"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default Addresturent;
