import React, { useState } from "react";
import { Table, Input, Pagination, Modal, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Search } = Input;

const OrderList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const pageSize = 5;

  const data = [
    { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric" },
    { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book" },
    { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine" },
    { id: "00004", name: "Gilbert Johnston", address: "768 Destiny Lake Suite 600", date: "05 Feb 2019", type: "Mobile" },
    { id: "00005", name: "Alan Cain", address: "042 Mylene Throughway", date: "29 Jul 2019", type: "Watch" },
    { id: "00006", name: "Alfred Murray", address: "543 Weinmann Mountain", date: "15 Aug 2019", type: "Medicine" },
    { id: "00007", name: "Maggie Sullivan", address: "New Scottieberg", date: "21 Dec 2019", type: "Watch" },
    { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine" },
    { id: "00009", name: "Dollie Hines", address: "124 Lyla Forge Suite 975", date: "09 Jan 2019", type: "Book" },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["sm"] },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address", responsive: ["md"] },
    { title: "Date", dataIndex: "date", key: "date", responsive: ["sm"] },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "View",
      key: "view",
      render: (text, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showOrderDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Function to show the modal with the order details
  const showOrderDetails = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Modal content displaying the order details
  const modalContent = currentOrder ? (
    <div>
      <p><strong>Order ID:</strong> {currentOrder.id}</p>
      <p><strong>Name:</strong> {currentOrder.name}</p>
      <p><strong>Address:</strong> {currentOrder.address}</p>
      <p><strong>Order Date:</strong> {currentOrder.date}</p>
      <p><strong>Type:</strong> {currentOrder.type}</p>
    </div>
  ) : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Order List</h2>
        <Search
          placeholder="Search orders..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-72"
          allowClear
        />
      </div>
      <div className="bg-white p-5 rounded shadow-md">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Modal to show the order details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrderList;
