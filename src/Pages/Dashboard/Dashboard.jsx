import { useState, useEffect } from "react";
import { Card, Modal, Spin, Alert } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";

const salesData = Array.from({ length: 60 }, (_, i) => ({
  name: `${i * 1000}`,
  value: Math.random() * 100,
}));

const Dashboard = () => {
  const { data: response = {}, isLoading, error } = useGetAllOrdersQuery();
  const fetchedOrders = response?.data || [];

  const totalUsers = new Set(
    fetchedOrders.map((order) => order.user?.userId || order.user?.id)
  ).size;

  const totalOrders = fetchedOrders.length;




  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Update orders state only when fetchedOrders changes
  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]);

  const handleEyeClick = (order) => {
    setActiveOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setActiveOrder(null);
  };

    const latestOrders = [...orders]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 4);


  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
      </div>

      {/* Stats Section */}

      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total User", value: totalUsers },
          { title: "Total Order", value: totalOrders },
          { title: "Total Sales", value: "$89,000" }, //  static Data
          { title: "Total Pending", value: 2040 }, //  static Data
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

      {/* Sales Chart */}
      <div className="p-4 mb-6 bg-white shadow-md sm:p-6 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Sales Details</h2>
        <div className="w-full min-w-[300px]">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f87171"
                strokeWidth={2}
                fill="#fecaca"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-4 overflow-x-auto bg-white shadow-md sm:p-6 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>

        {isLoading && <Spin tip="Loading orders..." />}
        {error && <Alert message="Error loading orders" type="error" />}

        {!isLoading && !error && (
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b">
                {["ID", "Name", "Address", "Date", "Payment Status", "Details"].map(
                  (col, i) => (
                    <th key={i} className="p-2 text-sm text-left text-gray-600">
                      {col}
                    </th>
                  )
                )}
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
                    <td className="p-2 text-sm">
                      {order.orderId || order.orderId}
                    </td>
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
                    <td className="p-2 text-sm">{order.paymentInfo.status}</td>
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

      {/* Modal for Order Details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {activeOrder && (
          <div>
            <p>
              <strong>Order ID:</strong>{" "}
              {activeOrder.orderId || activeOrder.orderId}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {activeOrder.name || activeOrder.user?.name}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {activeOrder.address || activeOrder.shippingAddress?.street}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {activeOrder.date ||
                new Date(activeOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {activeOrder.type || activeOrder.items?.[0]?.type || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
