import React, { useEffect, useState } from "react";
import { useAdminAuthentication } from "../../store/Authentication";
import dayjs from "dayjs";

function Dashboard() {
  const { OderDetails, orderdetails } = useAdminAuthentication();

  // State variables for total items, revenue, orders
  const [totalItems, setTotalItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // State variables for different breakdowns of revenue and items
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthlyItems, setMonthlyItems] = useState(0);
  const [weeklyItems, setWeeklyItems] = useState(0);
  const [todayItems, setTodayItems] = useState(0);

  // State variable for selected revenue type
  const [selectedRevenue, setSelectedRevenue] = useState("today");

  const fetchOrderDetails = async () => {
    try {
      await OderDetails();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to calculate totals and breakdowns
  const calculateTotalsAndBreakdowns = () => {
    if (orderdetails && orderdetails.length > 0) {
      const today = dayjs().startOf("day");
      const startOfWeek = dayjs().startOf("week").startOf("day");
      const startOfMonth = dayjs().startOf("month").startOf("day");

      let items = 0;
      let revenue = 0;
      let orders = 0;

      let monthlyRevenue = 0;
      let weeklyRevenue = 0;
      let todayRevenue = 0;

      let monthlyItems = 0;
      let weeklyItems = 0;
      let todayItems = 0;

      orderdetails.forEach((order) => {
        const orderDate = dayjs(order.createdAt).startOf("day");

        items += order.quantity;
        revenue += order.price * order.quantity;
        orders++;

        // Monthly calculation
        if (orderDate.isAfter(startOfMonth) || orderDate.isSame(startOfMonth, "day")) {
          monthlyRevenue += order.price * order.quantity;
          monthlyItems += order.quantity;
        }

        // Weekly calculation
        if (orderDate.isAfter(startOfWeek) || orderDate.isSame(startOfWeek, "day")) {
          weeklyRevenue += order.price * order.quantity;
          weeklyItems += order.quantity;
        }

        // Today calculation
        if (orderDate.isSame(today, "day")) {
          todayRevenue += order.price * order.quantity;
          todayItems += order.quantity;
        }
      });

      setTotalItems(items);
      setTotalRevenue(revenue);
      setTotalOrders(orders);

      setMonthlyRevenue(monthlyRevenue);
      setWeeklyRevenue(weeklyRevenue);
      setTodayRevenue(todayRevenue);

      setMonthlyItems(monthlyItems);
      setWeeklyItems(weeklyItems);
      setTodayItems(todayItems);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [OderDetails]);

  useEffect(() => {
    calculateTotalsAndBreakdowns();
  }, [orderdetails]);

  return (
    <div className="h-screen w-full">
      <h2 className="uppercase text-center pt-10 pb-5 text-black text-[40px] font-extrabold">
        Dashboard
      </h2>

      <hr className="bg-[#111111] h-[1.5px] border-0" />

      <div className="grid grid-cols-2 gap-5 px-5 py-5 w-full">
        <div className="h-[400px] min-w-[50%] bg-white shadow-2xl rounded-lg">
          <div className="w-full flex flex-col items-center px-[3rem] py-[1rem]">
            <h2 className="text-black text-[25px] font-[500] mb-4">Total Revenue</h2>
            <div className="w-full flex justify-center items-center gap-3">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedRevenue === "today" ? "bg-black text-white" : "bg-[#d9d9d9] text-gray-700"
                }`}
                onClick={() => setSelectedRevenue("today")}
              >
                Today
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedRevenue === "weekly" ? "bg-black text-white" : "bg-[#d9d9d9] text-gray-700"
                }`}
                onClick={() => setSelectedRevenue("weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedRevenue === "monthly" ? "bg-black text-white" : "bg-[#d9d9d9] text-gray-700"
                }`}
                onClick={() => setSelectedRevenue("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <h3 className="text-[35px] font-bold text-black">
              {selectedRevenue === "monthly"
                ? `${monthlyRevenue} INR`
                : selectedRevenue === "weekly"
                ? `${weeklyRevenue} INR`
                : `${todayRevenue} INR`}
            </h3>
          </div>
        </div>

        <div className="h-[400px] min-w-[50%] grid grid-cols-2 gap-5 justify-end items-center">
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl rounded-lg">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677107/1_hdoajx.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">{totalOrders}</span>
                <span className="text-black text-[18px]">Total Orders</span>
              </div>
            </div>
          </div>
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl rounded-lg">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677108/2_s4r06q.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">{totalRevenue}</span>
                <span className="text-black text-[18px]">Total Revenue (INR)</span>
              </div>
            </div>
          </div>
          <div className="h-[190px] min-w-[250px] bg-white flex justify-center items-center shadow-2xl rounded-lg">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/orrin/image/upload/v1724677108/3_v4qnh9.png"
                alt=""
                className="h-[100px]"
              />
              <div className="flex flex-col">
                <span className="text-black text-[35px] font-bold">
                  {selectedRevenue === "monthly"
                    ? monthlyItems
                    : selectedRevenue === "weekly"
                    ? weeklyItems
                    : todayItems}
                </span>
                <span className="text-black text-[18px]">Items Sold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
