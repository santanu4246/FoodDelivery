import React, { useEffect } from "react";
import { UserAuth } from "../../store/UserAuth";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function RestuCard({ item, count }) {
  
  const navigate = useNavigate();
  return (
    <div className="bg-white items-center justify-between flex w-[70%] border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2">
      <div className="flex">
        <img
          src={item.image}
          alt={item.name}
          className="w-[200px] h-[100px] object-cover"
        />
        <div className="p-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {item.name}
          </h2>
          <div className="flex items-center gap-[2px]">
            <IoLocationSharp className="text-[15px] relative top-[1px]" />
            <p className="text-gray-600 text-sm font-[500] truncate">
              {item.location}
            </p>
          </div>
          <p className="text-[13px] font-semibold text-gray-800 truncate">
            {count} Foods in cart
          </p>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => {
            navigate(`/payment/${item._id}`);
          }}
          className="mr-[20px] rounded-[7px] text-[white] font-[500] py-[5px] px-[2rem] bg-green-500 hover:bg-green-600"
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const { getCart, cart,isLoading } = UserAuth();

  useEffect(() => {
    getCart();
  }, []);

  return (
    isLoading ? (<div className="flex items-center justify-center h-[50vh] w-full"><BeatLoader size={20} color="red"/></div>) : (
      <div className="flex flex-col items-center my-[2rem]">
        {cart?.items && cart.items.length > 0 ? (
          cart.items.map((item) => (
            <RestuCard
              item={item.restaurant}
              count={item.foods.length}
              key={item._id}
            />
          ))
        ) : (
          <div className="text-black h-[30vh] flex items-center justify-center">No items in cart</div>
        )}
      </div>
    )
  );
  
}


export default Cart;
