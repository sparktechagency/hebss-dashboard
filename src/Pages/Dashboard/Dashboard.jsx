import { useState } from "react";
import { Card, Modal } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Eye } from "lucide-react";

const salesData = Array.from({ length: 60 }, (_, i) => ({
  name: `${i * 1000}`,
  value: Math.random() * 100,
}));

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [activeOrder, setActiveOrder] = useState(null); // State for the selected order

  const handleEyeClick = (order) => {
    setActiveOrder(order); // Set the active order when the eye icon is clicked
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
    setActiveOrder(null); // Reset active order
  };

  const orders = [
    { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric" },
    { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book" },
    { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine" },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["Total User", "Total Order", "Total Sales", "Total Pending"].map((title, i) => (
          <Card key={i} className="p-4 shadow-md bg-white">
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-xl sm:text-2xl font-bold">{[40689, 10293, "$89,000", 2040][i]}</p>
            <span className="text-xs text-green-600">{["8.5% Up", "1.3% Up", "4.3% Down", "1.8% Up"][i]}</span>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 sm:p-6 shadow-md rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
        <div className="w-full min-w-[300px]">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={2} fill="#fecaca" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 sm:p-6 shadow-md rounded-xl overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b">
              {["ID", "Name", "Address", "Date", "Type", "Details"].map((col, i) => (
                <th key={i} className="text-left p-2 text-gray-600 text-sm">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 text-sm">{order.id}</td>
                <td className="p-2 text-sm">{order.name}</td>
                <td className="p-2 text-sm">{order.address}</td>
                <td className="p-2 text-sm">{order.date}</td>
                <td className="p-2 text-sm">{order.type}</td>
                <td className="p-2 text-sm">
                  <Eye
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={() => handleEyeClick(order)} // Open modal with order details
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <p><strong>Order ID:</strong> {activeOrder.id}</p>
            <p><strong>Name:</strong> {activeOrder.name}</p>
            <p><strong>Address:</strong> {activeOrder.address}</p>
            <p><strong>Date:</strong> {activeOrder.date}</p>
            <p><strong>Type:</strong> {activeOrder.type}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
