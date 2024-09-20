import React, { useState } from "react";
import { useMenu } from "../../../store/Menu";
import { toast } from "react-toastify";
function AddFood() {
  const [title, setTitle] = useState(""); 
 
  // const [foodImage, setFoodImage] = useState(null); 
  const { addMenu } = useMenu();  // Fetching addMenu from store


  // const handleFoodImageChange = (e) => {
  //   setFoodImage(e.target.files[0]); 
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("title", title);

    // // Append each food item to formData
    // foodItems.forEach((food, index) => {
    //   formData.append(`food[${index}][name]`, food.name);
    //   formData.append(`food[${index}][price]`, food.price);
    //   formData.append(`food[${index}][veg]`, food.veg);
    //   // formData.append(`food[${index}][image]`, food.image); 
    // });

    try {
      await addMenu(title);
      toast.success("Menu submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit the menu.");
    }

   
    setFoodItems([]);
    setTitle("");
  };

  return (
    <div className="min-h-full w-full flex justify-center bg-gray-100 py-5">
      <div className="h-full w-[50%] bg-white shadow-2xl p-10 rounded-lg">
        <h2 className="uppercase text-center pb-5 text-black text-[30px] font-extrabold">
          Add Food Items to Menu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-black text-[18px] font-bold mb-2">
              Menu Title
            </label>
            <input
              type="text"
              id="title"
              className="border-2 border-gray-300 p-2 rounded-md text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#111111] text-white p-3 rounded-md font-bold w-full"
          >
            Submit Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
