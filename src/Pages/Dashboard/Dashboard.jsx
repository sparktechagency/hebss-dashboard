import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Eye } from "lucide-react";

const salesData = Array.from({ length: 60 }, (_, i) => ({
  name: `${i * 1000}`,
  value: Math.random() * 100,
}));

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="text-sm font-medium">Eyasin<br /><span className="text-gray-500">Admin</span></div>
        </div> */}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {["Total User", "Total Order", "Total Sales", "Total Pending"].map((title, i) => (
          <Card key={i} className="p-4 shadow-md bg-white">
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-2xl font-bold">{[40689, 10293, "$89,000", 2040][i]}</p>
            <span className="text-xs text-green-600">{["8.5% Up", "1.3% Up", "4.3% Down", "1.8% Up"][i]}</span>
          </Card>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={2} fill="#fecaca" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 shadow-md rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Recent Order</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {["ID", "Name", "Address", "Date", "Type", "Status"].map((col, i) => (
                <th key={i} className="text-left p-2 text-gray-600 text-sm">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric" },
              { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book" },
              { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine" }
            ].map((order, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 text-sm">{order.id}</td>
                <td className="p-2 text-sm">{order.name}</td>
                <td className="p-2 text-sm">{order.address}</td>
                <td className="p-2 text-sm">{order.date}</td>
                <td className="p-2 text-sm">{order.type}</td>
                <td className="p-2 text-sm"><Eye className="w-5 h-5 text-gray-500" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
