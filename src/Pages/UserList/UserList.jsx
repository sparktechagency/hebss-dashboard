import React, { useState, useEffect } from "react";
import { Table, Input, Pagination, Spin, Alert } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery } from "../../redux/features/user/userApi";

const { Search } = Input;

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 20;

  // Fetch data using the API hook
  const { data, isLoading, error } = useGetAllUserQuery();
  // console.log(data)

  // Ensure data is correctly structured and has 'users' array
  const users = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;
  const totalUsers = data?.meta?.totalData || 0;

  const columns = [
  { title: "Name", dataIndex: "firstName", key: "firstName" },
  { title: "Email", dataIndex: "email", key: "email" },
    {
    title: "Date",
    key: "createdAt",
    render: (record) =>
      new Date(record.createdAt).toLocaleDateString("en-GB"), 
  },
  {
    title: "Subscription",
    key: "subscription",
    render: (record) => (
      <span
        className={`px-2 py-1 rounded text-white ${
          record.subscription?.isActive ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        {record.subscription?.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    title: "View",
    key: "view",
    render: (_, record) => (
      <button
        className="px-2 py-1 text-white bg-red-500 rounded"
        onClick={() => navigate(`/user-details/${record._id}`)}
      >
        <EyeOutlined />
      </button>
    ),
  },
];


  // Filter based on search text (adjusted filtering logic)
  const filteredData = users.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h2 className="text-3xl font-bold">User List</h2>
        <Search
          placeholder="Search users..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-72"
          allowClear
        />
      </div>

      <div className="p-5 bg-white rounded shadow-md">
        {isLoading ? (
          <div className="flex justify-center my-10">
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert message="Failed to load users" type="error" />
        ) : filteredData.length === 0 ? (
          <Alert message="No users found" type="info" />
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={paginatedData}
              pagination={false}
              rowKey="_id"
              scroll={{ x: "max-content" }}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalUsers}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                pageSizeOptions={[pageSize]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
