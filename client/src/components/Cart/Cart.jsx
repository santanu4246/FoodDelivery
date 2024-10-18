import React, { useEffect } from "react";
import { UserAuth } from "../../store/UserAuth";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import ProfessionalLoader from "@/Loder/ProfessionalLoader";
function RestuCard({ item, count }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white items-center justify-between flex flex-col sm:flex-row w-[90%] sm:w-[80%] md:w-[70%] border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-full sm:w-[200px] h-[150px] sm:h-[100px] object-cover rounded-md mb-4 sm:mb-0"
        />
        <div className="sm:pl-4 flex flex-col items-start w-full">
          <h2 className="text-lg font-semibold text-gray-800 truncate mb-1">{item.name}</h2>
          <div className="flex items-center gap-[4px] mb-2">
            <IoLocationSharp className="text-[15px] relative top-[1px] text-green-600" />
            <p className="text-gray-600 text-sm font-[500] truncate">{item.location}</p>
          </div>
          <p className="text-[13px] font-semibold text-gray-800">{count} Foods in cart</p>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(`/payment/${item._id}`);
        }}
        className="w-full sm:w-auto mt-4 sm:mt-0 rounded-[7px] text-white font-[500] py-[8px] px-[2rem] bg-green-500 hover:bg-green-600 transition duration-200"
      >
        Proceed Payment
      </button>
    </div>
  );
}

function Cart() {
  const { getCart, cart, isLoading } = UserAuth();

  useEffect(() => {
    getCart();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-[50vh] w-full">
      <ProfessionalLoader />
    </div>
  ) : (
    <div className="flex flex-col items-center my-[2rem] px-4">
      {cart?.items && cart.items.length > 0 ? (
        cart.items.map((item) => (
          <RestuCard item={item.restaurant} count={item.foods.length} key={item._id} />
        ))
      ) : (
        <div className="text-black h-[30vh] flex items-center justify-center text-center text-lg font-medium">
          No items in cart
        </div>
      )}
    </div>
  );
}

export default Cart;
