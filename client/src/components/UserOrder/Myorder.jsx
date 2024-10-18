import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { ShoppingBag, Clock, Package, ChevronRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyOrder = () => {
  const { UserOrder, isLoading } = UserAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const res = await UserOrder();
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

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <ClipLoader color="#6366F1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            <p className="text-gray-500 mt-1">Track and manage your orders</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            {orders.length} Orders
          </Badge>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-white border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Package className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {order.restaurantName}
                        </h2>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{formatDateTime(order.date)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      Order #{orders.length - index}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-100">
                          <th className="pb-3 text-gray-600 font-medium">
                            Item
                          </th>
                          <th className="pb-3 text-right text-gray-600 font-medium">
                            Qty
                          </th>
                          <th className="pb-3 text-right text-gray-600 font-medium">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {order.items.map((item, idx) => (
                          <tr key={idx} className="group hover:bg-gray-50">
                            <td className="py-3 text-gray-900">{item.name}</td>
                            <td className="py-3 text-right text-gray-600">
                              {item.quantity}
                            </td>
                            <td className="py-3 text-right text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-gray-100">
                          <td className="pt-4 font-semibold text-gray-900">
                            Total Amount
                          </td>
                          <td className="pt-4"></td>
                          <td className="pt-4 text-right font-semibold text-lg text-black">
                            ₹{order.totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Start shopping to see your order history here. Your orders
                  will appear once you make your first purchase.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
