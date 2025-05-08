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
  const pageSize = 8; // As per the API limit

  // Fetch data using the API hook
  const { data, isLoading, error } = useGetAllUserQuery();

  // Log the API response to check its structure
  console.log("Fetched user data:", data);

  // Ensure data is correctly structured and has 'users' array
  const users = data?.data || [];  // Corrected from 'data?.users' to 'data?.data'
  const totalPage = data?.meta?.totalPage || 1;  // Using totalPage from the response
  const totalUsers = data?.meta?.totalData || 0;  // Using totalData from the response
  console.log("Users Array:", users); // Log users to verify structure

  const columns = [
    { title: "ID", dataIndex: "_id", key: "id", responsive: ["sm"] }, // Change dataIndex to "_id" to match API response
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      responsive: ["md"],
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button
          className="px-2 py-1 text-white bg-red-500 rounded"
          onClick={() => navigate(`/user-details/${record._id}`)} // Using _id as the key
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

  // Log filtered data to verify
  console.log("Filtered Data:", filteredData);

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log("Paginated Data:", paginatedData); // Log paginated data to verify

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
              dataSource={paginatedData} // Use the paginated data
              pagination={false}
              rowKey="_id"  // Use _id as the rowKey
              scroll={{ x: "max-content" }}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalUsers} // Use totalUsers from meta data
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                pageSizeOptions={[pageSize]} // Optional: Only one page size option
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
