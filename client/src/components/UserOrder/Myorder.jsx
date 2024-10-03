import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { ShoppingBag, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";

const MyOrder = () => {
  const { UserOrder, isLoading } = UserAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const res = await UserOrder();
      // Sort orders by date, most recent first
      const sortedOrders = res.data.orders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-IN", options);
  };

  return !isLoading ? (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Order History
      </h1>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="bg-gray-100 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {order.restaurantName}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDateTime(order.date)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600 text-sm">
                      <th className="pb-2">Item</th>
                      <th className="pb-2 text-right">Qty</th>
                      <th className="pb-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <td className="py-2 text-gray-800">{item.name}</td>
                        <td className="py-2 text-right text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="py-2 text-right text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-gray-800">
                      <td className="pt-4">Total</td>
                      <td className="pt-4"></td>
                      <td className="pt-4 text-right text-lg">
                        ₹{order.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">
            No orders found. Start shopping to see your orders here!
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="h-[50vh] w-full flex items-center justify-center">
      <ClipLoader />
    </div>
  );
};

export default MyOrder;
