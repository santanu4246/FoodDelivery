import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Editresturent from "./Editresturent";
import { useAdminAuthentication } from "../../../../store/Authentication";

const Updateresturent = () => {
  const { getAllRestrurants, allRestrurants } = useAdminAuthentication();
  useEffect(() => {
    async function fetchRestrurants() {
      try {
        await getAllRestrurants();
      } catch (error) {
        toast.warn(error.response?.data?.msg);
      }
    }
    fetchRestrurants();
  }, [getAllRestrurants]);
  const restaurantData = [
    {
      id: 1,
      name: "Restaurant One",
      imageUrl:
        "https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png",
      location: "New York, NY",
      cuisine: "Italian"
    },
    {
      id: 2,
      name: "Restaurant Two",
      imageUrl:
        "https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png",
      location: "Los Angeles, CA",
      cuisine: "Mexican"
    },
    {
      id: 3,
      name: "Restaurant Three",
      imageUrl:
        "https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png",
      location: "Chicago, IL",
      cuisine: "Chinese"
    },
    {
      id: 4,
      name: "Restaurant Four",
      imageUrl:
        "https://res.cloudinary.com/dkkznj8re/image/upload/v1724824455/orrin_psldtl.png",
      location: "Chicago, IL",
      cuisine: "Chinese"
    }
  ];
  const [Resturent, setResturent] = useState(null);
  const handleUpdateClick = (item) => {
    setResturent(item);
  };
  const Onclose = () => {
    setResturent(null);
  };
  useEffect(() => {
    if (Resturent) {
      console.log(Resturent);
    }
  }, [Resturent]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {allRestrurants &&
        allRestrurants.map((item) => {
          return (
            <div
              key={item.restrurant._id}
              className="h-[350px] w-[300px] bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Section */}
              <div
                className="h-[50%] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.restrurant.image})` }}
              ></div>

              {/* Content Section */}
              <div className="p-4 flex flex-col justify-between h-[50%]">
                <h2 className="text-lg font-semibold text-white mb-2">
                  {item.restrurant.name}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  {item.restrurant.location}
                </p>

                <div className="flex space-x-4">
                  <button
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={(e) => handleUpdateClick(item.restrurant)}
                  >
                    Update
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {Resturent && <Editresturent Resturent={Resturent} onClose={Onclose} />}
    </div>
  );
};

export default Updateresturent;
