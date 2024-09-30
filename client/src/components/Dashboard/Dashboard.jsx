import React, { useEffect, useState } from "react";
import { useAdminAuthentication } from "../../store/Authentication";
import dayjs from "dayjs";

function Dashboard() {
  const { OderDetails, orderdetails } = useAdminAuthentication();

  const [totalItems, setTotalItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);

  const [selectedRevenue, setSelectedRevenue] = useState("monthly");

  const fetchOrderDetails = async () => {
    try {
      await OderDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotals = () => {
    if (orderdetails && orderdetails.length > 0) {
      const items = orderdetails.reduce(
        (acc, order) => acc + order.quantity,
        0
      );
      const revenue = orderdetails.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      );
      setTotalItems(items);
      setTotalRevenue(revenue);
    }
  };

  
  const calculateRevenueBreakdown = () => {
    const today = dayjs();
    const startOfWeek = today.startOf("week");
    const startOfMonth = today.startOf("month");

    let monthly = 0;
    let weekly = 0;
    let todayTotal = 0;

    if (orderdetails && orderdetails.length > 0) {
      orderdetails.forEach((order) => {
        const orderDate = dayjs(order.createdAt);

   
        if (orderDate.isAfter(startOfMonth)) {
          monthly += order.price * order.quantity;
        }

  
        if (orderDate.isAfter(startOfWeek)) {
          weekly += order.price * order.quantity;
        }

 
        if (orderDate.isSame(today, "day")) {
          todayTotal += order.price * order.quantity;
        }
      });

      setMonthlyRevenue(monthly);
      setWeeklyRevenue(weekly);
      setTodayRevenue(todayTotal);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [OderDetails]);

  useEffect(() => {
    calculateTotals();
    calculateRevenueBreakdown();
  }, [orderdetails]);

  return (
    <div className="h-screen w-full">
      <h2 className="uppercase text-center pt-10 pb-5 text-black text-[40px] font-extrabold">
        DashBoard
      </h2>

      <hr className="bg-[#111111] h-[1.5px] border-0" />

      <div className="grid grid-cols-2 gap-5 px-5 py-5 w-full ">
        <div className="h-[400px] min-w-[50%] bg-white shadow-2xl">
          <div className="w-full flex justify-between items-center px-[3rem] py-[1rem] ">
            <h2 className="text-black text-[25px] font-[500]">Total Revenue</h2>
            <div className="w-[250px] h-[60px] bg-[#d9d9d9] flex justify-center items-center gap-5 rounded-md">
              <span
                className={`cursor-pointer ${
                  selectedRevenue === "monthly"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedRevenue("monthly")}
              >
                Monthly
              </span>
              <span
                className={`cursor-pointer ${
                  selectedRevenue === "weekly"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedRevenue("weekly")}
              >
                Weekly
              </span>
              <span
                className={`cursor-pointer ${
                  selectedRevenue === "today"
                    ? "bg-white text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedRevenue("today")}
              >
                Today
              </span>
            </div>
          </div>
          <div className="text-center mt-5">
            <h3 className="text-[30px] font-bold text-black">
              {selectedRevenue === "monthly"
                ? `${monthlyRevenue} INR`
                : selectedRevenue === "weekly"
                ? `${weeklyRevenue} INR`
                : `${todayRevenue} INR`}
            </h3>
          </div>
        </div>

        <div className="h-[400px] min-w-[50%] grid grid-cols-2 gap-5 justify-end items-center">
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677107/1_hdoajx.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">128</span>
                <span className="text-black text-[18px]">Total Menus</span>
              </div>
            </div>
          </div>
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677108/2_s4r06q.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">
                  {totalRevenue}
                </span>
                <span className="text-black text-[18px]">
                  Total Revenue (INR)
                </span>
              </div>
            </div>
          </div>
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677108/3_v4qnh9.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">
                  {totalItems}
                </span>
                <span className="text-black text-[18px]">Items Sold</span>
              </div>
            </div>
          </div>
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677064/4_hqosdx.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">128</span>
                <span className="text-black text-[18px]">Total Orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
