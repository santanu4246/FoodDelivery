import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRestrurant } from "@/store/Restrurants";
import ProfessionalLoader from "@/Loder/ProfessionalLoader";
import { ChevronLeft, Clock, Star } from "lucide-react";

const Category = () => {
  const [resByCategory, setResByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Category } = useParams();
  const navigate = useNavigate();

  const { GetRestaurentByCategory } = useRestrurant();

  const getRes = async () => {
    try {
      const data = await GetRestaurentByCategory(Category);
      setResByCategory(data.restaurantsWithMatches);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRes();
  }, [GetRestaurentByCategory, Category]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {Category}
            <span className="text-lg font-normal text-gray-500 ml-2">
              Restaurants
            </span>
          </h1>
          <div className="text-sm text-gray-500">
            {resByCategory.length}{" "}
            {resByCategory.length === 1 ? "Restaurant" : "Restaurants"} found
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <ProfessionalLoader />
          </div>
        ) : resByCategory.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
            {/* <Indian className="w-16 h-16 text-gray-300 mb-4" /> */}
            <span className="text-xl font-medium text-gray-600">
              No restaurants available in this category
            </span>
            <p className="text-gray-500 mt-2">Try exploring other categories</p>
          </div>
        ) : (
          resByCategory.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/restrurant/${item._id}`)}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 ">
                      {item.name}
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      {item.cuisine.slice(0, 3).map((cuisineItem, index) => (
                        <span key={index}>
                          {cuisineItem}
                          {index < 2 && index < item.cuisine.length - 1
                            ? " • "
                            : ""}
                        </span>
                      ))}
                      {item.cuisine.length > 3 && <span> ...</span>}
                    </div>
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-600">
                      4.2
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      ₹{item.perThali}
                    </span>
                    <span className="ml-1">for one</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>39 min</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
