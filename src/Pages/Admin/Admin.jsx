import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetAllAdminsQuery } from "../../redux/features/auth/authApi";

const AdminManagementPage = () => {
  // Use the RTK query hook to fetch admins from the API
  const { data: admins, isLoading, error } = useGetAllAdminsQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentAdmin, setCurrentAdmin] = useState(null); 

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
  });

  // Handle Create Admin
  const handleCreateAdmin = () => {
    setIsEditing(false); // Reset to create mode
    setNewAdmin({ name: "", email: "" });
    setIsModalVisible(true);
  };

  // Handle Edit Admin
  const handleEditAdmin = (admin) => {
    setIsEditing(true);
    setCurrentAdmin(admin);
    setNewAdmin({
      name: admin.name,
      email: admin.email,
    });
    setIsModalVisible(true);
  };

  // Handle Save Admin (Create or Edit)
  const handleSaveAdmin = () => {
    if (isEditing) {
      // Update existing admin
      message.success("Admin updated successfully!");
    } else {
      // Create a new admin
      message.success("Admin created successfully!");
    }
    setIsModalVisible(false);
  };

  // Handle Delete Admin
  const handleDeleteAdmin = (key) => {
    message.success("Admin deleted successfully!");
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle form input changes
  const handleInputChange = (e, field) => {
    setNewAdmin({ ...newAdmin, [field]: e.target.value });
  };

  // Columns for the table
  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: "10px", color: "#4CAF50" }}
            onClick={() => handleEditAdmin(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ color: "red" }}
            onClick={() => handleDeleteAdmin(record.key)}
          />
        </div>
      ),
    },
  ];

  // Handle loading and errors
  if (isLoading) return <p>Loading admins...</p>;
  if (error) return <p>Error loading admins: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="mb-4 text-2xl font-semibold">
          Administrator management
        </h3>

        <Button
          type="primary"
          onClick={handleCreateAdmin}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
        >
          Create New Admin
        </Button>
      </div>

      {/* Table with pagination */}
      <Table
        columns={columns}
        dataSource={admins} // Use the fetched admins data
        pagination={{
          pageSize: 5,
        }}
        rowKey="key"
      />

      {/* Modal for creating or editing admin */}
      <Modal
        title={isEditing ? "Edit Admin" : "Create Admin"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveAdmin}>
            Save
          </Button>,
        ]}
      >
        <div>
          <label>Name</label>
          <Input
            value={newAdmin.name}
            onChange={(e) => handleInputChange(e, "name")}
            style={{ marginBottom: "10px" }}
          />

          <label>Email</label>
          <Input
            value={newAdmin.email}
            onChange={(e) => handleInputChange(e, "email")}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
