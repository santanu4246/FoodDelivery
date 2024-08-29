import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";
import { FaDirections } from "react-icons/fa";

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

  useEffect(() => {
    console.log(restrurantData);
  }, [restrurantData]);

  return (
    <div className="h-screen w-full px-[10%] py-[5%] bg-gradient-to-br bg-white text-black">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl">
        <div className="h-[300px] w-[490px] overflow-hidden rounded-xl shadow-lg">
          <img
            src={restrurantData.image}
            alt="Restaurant"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-4xl font-bold text-black">{restrurantData.name}</h2>
        </div>
        
        <div className="mt-2">
          {
            restrurantData.cuisine && restrurantData.cuisine.map((item,index)=>{
              return <span key={index} className="text-lg font-[500] text-gray-600">{item} {index < restrurantData.cuisine.length - 1 ? ", " : ""}</span>
            })
          }
          
        </div>

        <div className="mt-2">
          <span className="text-lg font-[500] text-gray-500">{restrurantData.location}</span>
        </div>
        <div className="mt-4">
          <a
            href={restrurantData.geolocation}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <div className="inline-flex items-center gap-2  text-black py-2 px-4 rounded-lg border-2 border-red-400">
            <FaDirections className="text-xl" />
           <span className="">Direction</span>
           </div>
          </a>
        </div>

        <div className="mt-5 text-xl">
          Order online
        </div>

        <hr className="mt-5 border-t-1 border-gray-500" />

        
      </div>
    </div>
  );
}

export default RestrurantData;
