import React, { useState, useEffect } from "react";
import { Card, Modal, Spin, Alert } from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const {
    data: ordersResponse = {},
    isLoading: ordersLoading, // Renamed to avoid conflict
    error: ordersError, // Renamed to avoid conflict
  } = useGetAllOrdersQuery();
  const fetchedOrders = ordersResponse?.data || [];

  // State for the selected year for charts
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

  // States for fetch API data
  const [dashboardData, setDashboardData] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  const [dashError, setDashError] = useState(null);

  const [orders, setOrders] = useState([]); // This state is for recent orders table
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Effect to fetch dashboard metrics using the Fetch API
  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      setDashLoading(true);
      setDashError(null); // Clear previous errors

      try {
        const response = await fetch(
           `${API_BASE_URL}/dashboard-matrix/retrieve?year=${selectedYear}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
        setDashError(error);
      } finally {
        setDashLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, [selectedYear]); // Re-run effect when selectedYear changes

  // Update orders state on fetch
  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]);

  // Prepare chart data from dashboardData
  // Safely destructure dashboardData.data if the API wraps it
  const {
    totalUsers = 0,
    totalOrders = 0,
    totalProducts = 0,
    totalBlogs = 0,
    chartData = {},
  } = dashboardData?.data || {}; 

  const { months = [], userStatistics = [], orderStatistics = [] } = chartData;

  // Map chart data for recharts
  const ordersData = months.map((month, i) => ({
    name: month,
    orders: orderStatistics[i] || 0,
  }));

  const userGrowthData = months.map((month, i) => ({
    name: month,
    users: userStatistics[i] || 0,
  }));

  const handleEyeClick = (order) => {
    setActiveOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setActiveOrder(null);
  };

  // Handler for year selection change
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); 

  // Sort latest orders for table
  const latestOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // Loading or error handling for dashboard data (charts and stats)
  if (dashLoading) return <Spin tip="Loading dashboard data..." />;
  if (dashError)
    return <Alert message={`Failed to load dashboard data: ${dashError.message}`} type="error" />;

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: totalUsers },
          { title: "Total Orders", value: totalOrders },
          { title: "Total Products", value: totalProducts },
          { title: "Total Blogs", value: totalBlogs },
        ].map(({ title, value }, i) => (
          <Card key={i} className="p-4 bg-white shadow-md">
            <h3 className="text-sm text-gray-600">{title}</h3>
            <p className="text-xl font-bold sm:text-2xl">{value}</p>
            <span className="text-xs text-green-600">
              {["8.5% Up", "1.3% Up", "4.3% Down", "1.8% Up"][i]}
            </span>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap gap-x-4">
        {/* Orders Bar Chart */}
        <div
          className="p-4 mb-6 bg-white shadow-md sm:p-6 rounded-xl flex-1 min-w-[300px]"
          style={{ border: "1px solid #ddd" }}
        >
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-semibold">Orders (Monthly)</h2>
            <select onChange={handleYearChange} value={selectedYear}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Line Chart */}
        <div
          className="p-4 mb-6 bg-white shadow-md sm:p-6 rounded-xl flex-1 min-w-[300px]"
          style={{ border: "1px solid #ddd" }}
        >
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-semibold">User Growth (Monthly)</h2>
            <select onChange={handleYearChange} value={selectedYear}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#f87171"
                strokeWidth={2}
                fill="#fecaca"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table (unchanged from your original, still uses RTK Query) */}
      <div className="p-4 overflow-x-auto bg-white shadow-md sm:p-6 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>

        {ordersLoading && <Spin tip="Loading orders..." />}
        {ordersError && <Alert message="Error loading orders" type="error" />}

        {!ordersLoading && !ordersError && (
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b">
                {[
                  "ID",
                  "Name",
                  "Address",
                  "Date",
                  "Payment Status",
                  "Details",
                ].map((col, i) => (
                  <th key={i} className="p-2 text-sm text-left text-gray-600">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {latestOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                latestOrders.map((order, i) => (
                  <tr key={order.id || i} className="border-b">
                    <td className="p-2 text-sm">{order.orderId}</td>
                    <td className="p-2 text-sm">
                      {order.name || order.user?.name}
                    </td>
                    <td className="p-2 text-sm">
                      {order.address || order.shippingAddress?.street}
                    </td>
                    <td className="p-2 text-sm">
                      {order.date ||
                        new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-sm">{order.paymentInfo?.status}</td>
                    <td className="p-2 text-sm">
                      <Eye
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => handleEyeClick(order)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {activeOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {activeOrder.orderId}
            </p>
            <p>
              <strong>Name:</strong>
              {activeOrder.name || activeOrder.user?.name}
            </p>
            <p>
              <strong>Address:</strong>
              {activeOrder.address || activeOrder.shippingAddress?.street}
            </p>
            <p>
              <strong>Date:</strong>
              {activeOrder.date ||
                new Date(activeOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Type:</strong>
              {activeOrder.type || activeOrder.items?.[0]?.type || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;