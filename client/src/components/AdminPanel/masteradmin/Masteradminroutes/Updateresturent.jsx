import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Editresturent from "./Editresturent";
import { useAdminAuthentication } from "../../../../store/Authentication";
import { BeatLoader } from "react-spinners";

const Updateresturent = () => {
  const { getAllRestrurants, allRestrurants, deleteAdmin, isLoading } =
    useAdminAuthentication();
  const [targetIndex, setTargetIndex] = useState(null);
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
  const [Resturent, setResturent] = useState(null);
  const handleUpdateClick = (item) => {
    const obj = {
      adminID: item._id,
      username: item.username,
      name: item.restrurant.name,
      location: item.restrurant.location
    };
    setResturent(obj);
  };
  const Onclose = () => {
    setResturent(null);
  };
  async function handleDeleteAdmin(adminId, index) {
    setTargetIndex(index);
    try {
      const msg = await deleteAdmin(adminId);
      await getAllRestrurants();
      toast.success(msg);
    } catch (error) {
      toast.warn(error.response?.data?.msg || error.message);
    } finally {
      setTargetIndex(null);
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {allRestrurants &&
        allRestrurants.map((item, index) => {
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
                <h2 className="text-sm font-semibold text-[#ffffffa8] mb-2">
                  @{item.username}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  {item.restrurant.location}
                </p>

                <div className="flex space-x-4">
                  <button
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={(e) => handleUpdateClick(item)}
                  >
                    Update
                  </button>
                  <button
                    style={{ pointerEvents: isLoading ? "none" : "auto" }}
                    onClick={() => {
                      handleDeleteAdmin(item._id, index);
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  >
                    {isLoading && targetIndex && targetIndex === index ? (
                      <BeatLoader size={7} color="#ffffff" />
                    ) : (
                      <span>Delete</span>
                    )}
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
