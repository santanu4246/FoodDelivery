import React, { useEffect, useState } from 'react'
import { useMenu } from '../../../store/Menu'

const EditFood = () => {
  const { getfoodbyrestuid } = useMenu()
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getfoodbyrestuid()
        setMenuItems(response.menuitems)
      } catch (error) {
        console.error("Failed to fetch menu items", error)
      }
    }
    fetchMenuItems()
  }, [getfoodbyrestuid])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Menu
      </h2>
      {menuItems.length > 0 ? (
        <div className="space-y-8">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {menuItem.title}
              </h3>

              {/* Vegetarian Foods */}
              <h4 className="text-lg font-semibold text-green-600 mb-2">Vegetarian</h4>
              <ul className="space-y-2 mb-4">
                {menuItem.foods
                  .filter(food => food.veg) // Filter for vegetarian foods
                  .map((food, foodIndex) => (
                    <li
                      key={foodIndex}
                      className="flex items-center justify-between p-4 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      <span className="text-gray-600">{food.name} - ₹{food.price}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                    </li>
                  ))}
              </ul>

              {/* Non-Vegetarian Foods */}
              <h4 className="text-lg font-semibold text-red-600 mb-2">Non-Vegetarian</h4>
              <ul className="space-y-2">
                {menuItem.foods
                  .filter(food => !food.veg) // Filter for non-vegetarian foods
                  .map((food, foodIndex) => (
                    <li
                      key={foodIndex}
                      className="flex items-center justify-between p-4 bg-red-100 rounded-md hover:bg-red-200"
                    >
                      <span className="text-gray-600">{food.name} - ₹{food.price}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading menu items...</p>
      )}
    </div>
  )
}

export default EditFood
