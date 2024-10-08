import React, { useState } from 'react'
import { useMenu } from '../../../store/Menu'

const DeleteMenu = ({MenuItem,fetchMenuItems,setisdeleteMenu}) => {
  const {deleteMenu} = useMenu()
  const onClose = ()=>{
    setisdeleteMenu(false)
  }
  const handleDelete = async (MenuID)=>{
   try {
     await deleteMenu(MenuID)
     await fetchMenuItems()
     setisdeleteMenu(false)
   } catch (error) {
    
   }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="text-black max-w-sm mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete "{MenuItem.title}"?
        </h2>
        <div className="flex justify-around">
          <button
            onClick={() => handleDelete(MenuItem.id)}
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
  )
}

export default DeleteMenu