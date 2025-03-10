import React, { useState } from "react";
import { Table, Input, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 5;

  const data = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: "Electric",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      type: "Book",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      type: "Medicine",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destiny Lake Suite 600",
      date: "05 Feb 2019",
      type: "Mobile",
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "29 Jul 2019",
      type: "Watch",
    },
    {
      id: "00006",
      name: "Alfred Murray",
      address: "543 Weinmann Mountain",
      date: "15 Aug 2019",
      type: "Medicine",
    },
    {
      id: "00007",
      name: "Maggie Sullivan",
      address: "New Scottieberg",
      date: "21 Dec 2019",
      type: "Watch",
    },
    {
      id: "00008",
      name: "Rosie Todd",
      address: "New Jon",
      date: "30 Apr 2019",
      type: "Medicine",
    },
    {
      id: "00009",
      name: "Dollie Hines",
      address: "124 Lyla Forge Suite 975",
      date: "09 Jan 2019",
      type: "Book",
    },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["sm"] },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
    },
    { title: "Date", dataIndex: "date", key: "date", responsive: ["sm"] },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => navigate(`/user-details/${record.id}`)}
        >
          <EyeOutlined />
        </button>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">User List</h2>
        <Search
          placeholder="Search users..."
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
    </div>
  );
};

export default UserList;
