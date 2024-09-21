import React, { useEffect } from "react";
import { UserAuth } from "../../store/UserAuth";
import { IoLocationSharp } from "react-icons/io5";

function RestuCard({ item,count }) {
  return (
    <div className="bg-white flex w-[70%] border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2">
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
  );
}

function Cart() {
  const { getCart, cart } = UserAuth();
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="flex flex-col items-center">
      {cart?.items?.map((item) => {
        console.log(item);
        return <RestuCard item={item.restaurant} count={item.foods.length} key={item._id} />;
      })}
    </div>
  );
}

export default Cart;
