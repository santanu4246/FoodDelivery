import React from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
const Loginoption = ({ setLogin, setloginOptions }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setloginOptions(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-[1.5rem] rounded-lg shadow-md w-96 relative">
        <RxCross2
          onClick={handleClose}
          className="absolute top-[10px] right-[10px] text-[18px] cursor-pointer"
        />
        <div className="flex flex-col gap-3 mt-5">
          <button
            onClick={() => {
              setLogin(true), setloginOptions(false);
            }}
            className="bg-red-500 text-white rounded-md p-2 "
          >
            Login as user
          </button>
          <button
            onClick={() => {
              navigate("/admin"), setloginOptions(false);
            }}
            className="bg-red-500 text-white rounded-md p-2"
          >
            Login as admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginoption;
