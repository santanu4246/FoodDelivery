import React, { useEffect, useState } from "react";
import { useAdminAuthentication } from "../../store/Authentication";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Reusable components
const StatCard = ({ icon: Icon, title, value, subtitle, isLoading }) => (
  <Card className="relative overflow-hidden">
    <CardContent className="p-6">
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-12" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[120px]" />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

const ErrorAlert = ({ message }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        contentStyle={{
          backgroundColor: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "6px",
        }}
        formatter={(value) => [`₹ ${value.toLocaleString()}`, "Revenue"]}
      />
      <Legend />
      <Bar
        dataKey="value"
        fill="hsl(var(--primary))"
        radius={[4, 4, 0, 0]}
        name="Revenue"
      />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const { OderDetails, orderdetails } = useAdminAuthentication();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRevenue, setSelectedRevenue] = useState("today");

  // State for metrics
  const [metrics, setMetrics] = useState({
    total: { items: 0, revenue: 0, orders: 0 },
    monthly: { items: 0, revenue: 0, orders: 0 },
    weekly: { items: 0, revenue: 0, orders: 0 },
    today: { items: 0, revenue: 0, orders: 0 }
  });

  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await OderDetails();
    } catch (error) {
      setError("Failed to fetch order details. Please try again later.");
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMetrics = () => {
    if (!orderdetails?.length) return;

    const today = dayjs().startOf("day");
    const startOfWeek = dayjs().startOf("week");
    const startOfMonth = dayjs().startOf("month");

    const newMetrics = {
      total: { items: 0, revenue: 0, orders: 0 },
      monthly: { items: 0, revenue: 0, orders: 0 },
      weekly: { items: 0, revenue: 0, orders: 0 },
      today: { items: 0, revenue: 0, orders: 0 }
    };

    orderdetails.forEach((order) => {
      const orderDate = dayjs(order.createdAt);
      let orderRevenue = 0;
      let orderItemsCount = 0;

      order.items.forEach((item) => {
        orderItemsCount += item.quantity;
        orderRevenue += item.price * item.quantity;
      });

      // Update total metrics
      newMetrics.total.items += orderItemsCount;
      newMetrics.total.revenue += orderRevenue;
      newMetrics.total.orders += 1;

      // Update period-specific metrics
      if (orderDate.isSame(today, "day")) {
        newMetrics.today.items += orderItemsCount;
        newMetrics.today.revenue += orderRevenue;
        newMetrics.today.orders += 1;
      }

      if (orderDate.isAfter(startOfWeek) || orderDate.isSame(startOfWeek, "day")) {
        newMetrics.weekly.items += orderItemsCount;
        newMetrics.weekly.revenue += orderRevenue;
        newMetrics.weekly.orders += 1;
      }

      if (orderDate.isAfter(startOfMonth) || orderDate.isSame(startOfMonth, "day")) {
        newMetrics.monthly.items += orderItemsCount;
        newMetrics.monthly.revenue += orderRevenue;
        newMetrics.monthly.orders += 1;
      }
    });

    setMetrics(newMetrics);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    calculateMetrics();
  }, [orderdetails]);

  const chartData = [
    { name: "Today", value: metrics.today.revenue },
    { name: "This Week", value: metrics.weekly.revenue },
    { name: "This Month", value: metrics.monthly.revenue }
  ];

  const getCurrentMetrics = () => {
    switch (selectedRevenue) {
      case "monthly":
        return metrics.monthly;
      case "weekly":
        return metrics.weekly;
      default:
        return metrics.today;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {dayjs().format("MMMM D, YYYY")}
        </p>
      </div>

      {error && <ErrorAlert message={error} />}

      {/* Revenue Overview Card */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex justify-between items-center">
            <CardTitle>Revenue Overview</CardTitle>
            <Tabs 
              defaultValue="today" 
              value={selectedRevenue} 
              onValueChange={setSelectedRevenue}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="mt-4 flex justify-center">
            <h3 className="text-4xl font-bold">
              ₹ {getCurrentMetrics().revenue.toLocaleString()}
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={getCurrentMetrics().orders.toLocaleString()}
          subtitle="Orders this period"
          isLoading={isLoading}
        />
        <StatCard
          icon={TrendingUp}
          title="Total Revenue"
          value={`₹ ${metrics.total.revenue.toLocaleString()}`}
          subtitle="Lifetime revenue"
          isLoading={isLoading}
        />
        <StatCard
          icon={Activity}
          title="Lifetime Orders"
          value={metrics.total.orders.toLocaleString()}
          subtitle="Total orders processed"
          isLoading={isLoading}
        />
        <StatCard
          icon={Package}
          title="Items Sold"
          value={getCurrentMetrics().items.toLocaleString()}
          subtitle="Units this period"
          isLoading={isLoading}
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <RevenueChart data={chartData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;