import React, { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd"; // Ant Design components
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminMutation,
} from "../../redux/features/admin/adminApi"; // Import the mutation and query hooks
import { data } from "autoprefixer";

const AdminManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track whether we're editing or creating an admin
  const [currentAdminId, setCurrentAdminId] = useState(null); // Store the ID of the admin being edited

  const { data: alladmin, error, isLoading: isLoadingAdmins} = useGetAllAdminsQuery(); // Fetch admins data
  console.log(alladmin)
  const admins = alladmin?.data || []; // Safely extract admins as an array
  const [createAdmin, { isLoading: isCreatingAdmin }] = useCreateAdminMutation();
  const [deleteAdmin, { isLoading: isDeletingAdmin }] = useDeleteAdminMutation();
  const [updateAdmin, { isLoading: isUpdatingAdmin }] = useUpdateAdminMutation();

  // Handle Create Admin
  const handleCreateAdmin = () => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: "", email: "", password: "" });
    setIsEditing(false); // Set to create mode
    
  };

  // Handle Edit Admin
  const handleEditAdmin = (admin) => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: admin.fullName, email: admin.email, password: "" }); // Pre-fill the form with existing data
    setCurrentAdminId(admin._id); // Store the ID of the admin being edited
    setIsEditing(true); // Set to editing mode
  };

  const handleSaveAdmin = async () => {
    try {
      const adminData = isEditing ? { fullName: newAdmin.fullName } : newAdmin;

      if (isEditing) {
        // console.log("Updating admin with ID:", currentAdminId);
        const response = await updateAdmin({
          id: currentAdminId,
          data: adminData,
        }).unwrap();
        console.log("Admin updated successfully:", response);
        message.success("Admin updated successfully!");
      } else {
        // Creating a new admin
        // console.log("Creating a new admin:", adminData);
        const response = await createAdmin(adminData).unwrap();
        // console.log("Admin created successfully:", response);
        message.success("Admin created successfully!");
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving admin:", error);
      message.error("Failed to save admin. Please try again.");
    }
  };

  // Handle Delete Admin
  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id).unwrap();
      message.success("Admin deleted successfully!");
    } catch (error) {
      message.error("Failed to delete admin. Please try again.");
    }
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
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: "10px", color: "#4CAF50" }}
            onClick={() => handleEditAdmin(record)} // Open edit modal
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ color: "red" }}
            onClick={() => handleDeleteAdmin(record._id)} // Delete admin
          />
        </div>
      ),
    },
  ];

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
        dataSource={admins} // Display admins fetched from the backend
        pagination={{ pageSize: 5 }}
        rowKey="_id" // Assuming `_id` is the unique identifier for each admin
        loading={isLoadingAdmins}
      />

      {/* Modal for Create or Edit Admin */}
      <Modal
        title={isEditing ? "Edit Admin" : "Create Admin"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSaveAdmin}
            loading={isUpdatingAdmin || isCreatingAdmin}
          >
            Save
          </Button>,
        ]}
      >
        <div>
          <label>Full Name</label>
          <Input
            value={newAdmin.fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            style={{ marginBottom: "10px" }}
          />
          <label>Email</label>
          <Input
            value={newAdmin.email}
            onChange={(e) => handleInputChange(e, "email")}
            style={{ marginBottom: "10px" }}
          />
          <label>Password</label>
          <Input
            type="password"
            value={newAdmin.password}
            onChange={(e) => handleInputChange(e, "password")}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
