import React from 'react'

const restaurantData = [
  {
    id: 1,
    name: 'Restaurant One',
    imageUrl: 'https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png',
    location: 'New York, NY',
    cuisine: 'Italian',
  },
  {
    id: 2,
    name: 'Restaurant Two',
    imageUrl: 'https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png',
    location: 'Los Angeles, CA',
    cuisine: 'Mexican',
  },
  {
    id: 3,
    name: 'Restaurant Three',
    imageUrl: 'https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png',
    location: 'Chicago, IL',
    cuisine: 'Chinese',
  },
  {
    id: 4,
    name: 'Restaurant Four',
    imageUrl: 'https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png',
    location: 'Chicago, IL',
    cuisine: 'Chinese',
  },

]

const Updateresturent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {restaurantData.map((restaurant) => (
        <div key={restaurant.id} className="h-[450px] w-[300px] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          
          {/* Image Section */}
          <div className="h-[50%] bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.imageUrl})` }}>
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col justify-between h-[50%]">
            <h2 className="text-lg font-semibold text-white mb-2">{restaurant.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{restaurant.location}</p>
            <p className="text-sm text-gray-400 mb-4">{restaurant.cuisine}</p>

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Update
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Updateresturent
