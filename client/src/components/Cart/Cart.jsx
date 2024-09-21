import React, { useEffect } from "react";
import { UserAuth } from "../../store/UserAuth";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
          className="mr-[20px] rounded-[7px] text-[white] font-[500] py-[5px] px-[2rem] bg-[#ff008c]"
        >
          Proceed payment
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const { getCart, cart } = UserAuth();
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="flex flex-col items-center my-[2rem]">
      {cart?.items?.map((item) => {
        console.log(item);
        return (
          <RestuCard
            item={item.restaurant}
            count={item.foods.length}
            key={item._id}
          />
        );
      })}
    </div>
  );
}

export default Cart;
