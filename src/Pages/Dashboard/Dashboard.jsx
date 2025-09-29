import React, { useState, useEffect } from "react";
import { Card, Modal, Spin, Alert, Table, Button, Row, Col, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
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

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  // Fetch latest 5 orders
  const { data: ordersResponse = {}, isLoading: ordersLoading, error: ordersError } = useGetAllOrdersQuery({
    page: 1,
    limit: 5,
  });

  const latestOrders = ordersResponse?.data || [];

  // State for selected year for charts
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // States for dashboard metrics
  const [dashboardData, setDashboardData] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  const [dashError, setDashError] = useState(null);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Fetch dashboard metrics
  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      setDashLoading(true);
      setDashError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard-matrix/retrieve?year=${selectedYear}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
  }, [selectedYear]);

  // Prepare chart data
  const { totalUsers = 0, totalOrders = 0, totalProducts = 0, totalBlogs = 0, chartData = {} } =
    dashboardData?.data || {};

  const { months = [], userStatistics = [], orderStatistics = [] } = chartData;

  const ordersData = months.map((month, i) => ({ name: month, orders: orderStatistics[i] || 0 }));
  const userGrowthData = months.map((month, i) => ({ name: month, users: userStatistics[i] || 0 }));

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Handlers
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));
  const handleEyeClick = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentOrder(null);
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "ordered":
        return "gold";
      case "ongoing":
        return "blue";
      case "delivered":
        return "green";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Name", dataIndex: ["user", "name"], key: "name" },
    { title: "Email", dataIndex: ["user", "email"], key: "email" },
    {
      title: "Address",
      key: "address",
      render: (_, record) =>
        `${record.shippingAddress?.street || ""}, ${record.shippingAddress?.city || ""}, ${record.shippingAddress?.state || ""}, ${record.shippingAddress?.zipCode || ""}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span style={{ color: getStatusColor(status), fontWeight: "bold" }}>{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Button type="link" icon={<EyeOutlined />} onClick={() => handleEyeClick(record)} />,
    },
  ];

  const modalContent = currentOrder && (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <p>
            <strong>Order ID:</strong> {currentOrder.orderId}
          </p>
          <p>
            <strong>Order Date:</strong> {new Date(currentOrder.createdAt).toLocaleString()}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: getStatusColor(currentOrder.status), fontWeight: "bold" }}>
              {currentOrder.status}
            </span>
          </p>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>Name:</strong> {currentOrder.user?.name}</p>
          <p><strong>Email:</strong> {currentOrder.user?.email}</p>
          <p><strong>Phone:</strong> {currentOrder.user?.phone || "Not provided"}</p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Address:</strong>{" "}
            {`${currentOrder.shippingAddress?.street}, ${currentOrder.shippingAddress?.city}, ${currentOrder.shippingAddress?.state}, ${currentOrder.shippingAddress?.zipCode}`}
          </p>
        </Col>
      </Row>
      <Divider />
      <p><strong>Items:</strong></p>
      <ul>
        {currentOrder.items?.map((item, i) => (
          <li key={i} className="flex items-center mb-2">
            <img src={AllImages.book} alt={item.name} className="w-12 h-12 mr-4" />
            <span>{item.name || "Item"} - ${item.price?.amount || 0}</span>
          </li>
        ))}
      </ul>
      <p><strong>Total Price:</strong> ${currentOrder.total?.amount || 0}</p>
    </div>
  );

  if (dashLoading || ordersLoading) return <Spin tip="Loading..." size="large" />;
  if (dashError) return <Alert message={`Dashboard Error: ${dashError.message}`} type="error" />;
  if (ordersError) return <Alert message={`Orders Error: ${ordersError.message}`} type="error" />;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[{ title: "Total Users", value: totalUsers }, { title: "Total Orders", value: totalOrders }, { title: "Total Products", value: totalProducts }, { title: "Total Blogs", value: totalBlogs }].map(
          ({ title, value }, i) => (
            <Card key={i} className="p-4 bg-white shadow-md">
              <h3 className="text-sm text-gray-600">{title}</h3>
              <p className="text-xl font-bold sm:text-2xl">{value}</p>
            </Card>
          )
        )}
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="p-4 bg-white shadow-md rounded-xl flex-1 min-w-[300px]">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold">Orders (Monthly)</h3>
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
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

        <div className="p-4 bg-white shadow-md rounded-xl flex-1 min-w-[300px]">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold">User Growth (Monthly)</h3>
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#f87171" strokeWidth={2} fill="#fecaca" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Orders Table */}
      <div className="p-5 bg-white rounded shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Latest 5 Orders</h3>
        <Table
          columns={columns}
          dataSource={latestOrders}
          pagination={false}
          rowKey="_id"
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Modal */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Dashboard;
