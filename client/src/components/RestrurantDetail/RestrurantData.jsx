import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";
import { FaDirections } from "react-icons/fa";
import Menu from "./Menu";

function RestrurantData() {
  const { id } = useParams();
  const { getRestrurantById } = useAdminAuthentication();
  const [restrurantData, setRestrurantData] = useState([]);


  useEffect(() => {
    async function getRestrurant() {
      try {
        const res = await getRestrurantById(id);
        setRestrurantData(res);
      
      } catch (error) {
        console.log(error);
      }
    }
    if (id) getRestrurant();
  }, [id]);

 

  
  return (
    <div className="min-h-screen w-full px-[8%] py-[5%] bg-gray-50 text-gray-900">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Restaurant Image */}
        <div className="flex justify-center">
          <div className="h-[300px] w-full max-w-xl overflow-hidden rounded-xl shadow-md">
            <img
              src={restrurantData.image}
              alt="Restaurant"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            {restrurantData.name}
          </h2>
          <div className="mt-2 text-lg text-gray-600">
            {restrurantData.cuisine &&
              restrurantData.cuisine.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < restrurantData.cuisine.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>
          <div className="mt-2 text-lg text-gray-500">
            {restrurantData.location}
          </div>

          <div className="mt-4">
            <a
              href={restrurantData.geolocation}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="inline-flex items-center gap-2 text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
                <FaDirections className="text-xl" />
                <span>Get Directions</span>
              </div>
            </a>
          </div>
        </div>

        <hr className="mt-8 border-t-1 border-gray-300" />

        {/* Menu Section */}
        <Menu  menu={restrurantData.menu}/>
      </div>
    </div>
  );
}

export default RestrurantData;
