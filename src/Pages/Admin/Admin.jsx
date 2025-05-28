import React, { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminMutation,
} from "../../redux/features/admin/adminApi";

const AdminManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  const {
    data: alladmin,
    isLoading: isLoadingAdmins,
    refetch,
  } = useGetAllAdminsQuery();

  const admins = alladmin?.data || [];

  const [createAdmin, { isLoading: isCreatingAdmin }] = useCreateAdminMutation();
  const [deleteAdmin, { isLoading: isDeletingAdmin }] = useDeleteAdminMutation();
  const [updateAdmin, { isLoading: isUpdatingAdmin }] = useUpdateAdminMutation();

  const handleCreateAdmin = () => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: "", email: "", password: "" });
    setIsEditing(false);
  };

  const handleEditAdmin = (admin) => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: admin.fullName, email: admin.email, password: "" });
    setCurrentAdminId(admin._id);
    setIsEditing(true);
  };

  const handleSaveAdmin = async () => {
  try {
    const adminData = {
      fullName: newAdmin.fullName,
      // Do NOT send email or password here
    };

    if (isEditing) {
      await updateAdmin({ id: currentAdminId, data: adminData }).unwrap();
      message.success("Admin updated successfully!");
    } else {
      // On create, send all fields including password
      await createAdmin(newAdmin).unwrap();
      message.success("Admin created successfully!");
    }

    setIsModalVisible(false);
    refetch();
  } catch (error) {
    console.error("Update admin error:", error);
    message.error(
      error?.data?.error || error?.data?.message || "Failed to update admin. Please try again."
    );
  }
};





// const handleSaveAdmin = async () => {
//   try {
//     const adminData = {
//       fullName: newAdmin.fullName,
//       email: newAdmin.email,
//     };

//     // If password is needed during update (rare), include it conditionally
//     if (newAdmin.password && newAdmin.password.trim() !== "") {
//       adminData.password = newAdmin.password;
//     }

//     if (isEditing) {
//       await updateAdmin({ id: currentAdminId, data: adminData }).unwrap();
//       message.success("Admin updated successfully!");
//     } else {
//       await createAdmin(newAdmin).unwrap();
//       message.success("Admin created successfully!");
//     }

//     setIsModalVisible(false);
//     refetch();
//   } catch (error) {
//     console.error("Update admin error:", error);
//     message.error(
//       error?.data?.message || error?.error || "Failed to update admin. Please try again."
//     );
//   }
// };


  // const handleSaveAdmin = async () => {
  //   try {
  //     const adminData = isEditing
  //       ? { fullName: newAdmin.fullName, email: newAdmin.email }
  //       : newAdmin;

  //     if (isEditing) {
  //       await updateAdmin({ id: currentAdminId, data: adminData }).unwrap();
  //       message.success("Admin updated successfully!");
  //     } else {
  //       await createAdmin(adminData).unwrap();
  //       message.success("Admin created successfully!");
  //     }

  //     setIsModalVisible(false);
  //     refetch(); // Manually refresh admins list immediately after mutation
  //   } catch (error) {
  //     console.error("Error saving admin:", error);
  //     message.error("Failed to save admin. Please try again.");
  //   }
  // };

  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id).unwrap();
      message.success("Admin deleted successfully!");
      refetch(); // Manually refresh admins list immediately after delete
    } catch (error) {
      console.error("Delete admin error:", error);
      message.error("Failed to delete admin. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setNewAdmin({ ...newAdmin, [field]: e.target.value });
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 10, color: "#4CAF50" }}
            onClick={() => handleEditAdmin(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ color: "red" }}
            onClick={() => handleDeleteAdmin(record._id)}
            loading={isDeletingAdmin}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="mb-4 text-2xl font-semibold">Administrator Management</h3>
        <Button
          type="primary"
          onClick={handleCreateAdmin}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
          loading={isCreatingAdmin || isUpdatingAdmin}
        >
          Create New Admin
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={[...admins]} // Spread to force React rerender on update
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        loading={isLoadingAdmins}
      />

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
        <label>Full Name</label>
        <Input
          value={newAdmin.fullName}
          onChange={(e) => handleInputChange(e, "fullName")}
          style={{ marginBottom: 10 }}
        />
        <label>Email</label>
        <Input
          value={newAdmin.email}
          onChange={(e) => handleInputChange(e, "email")}
          style={{ marginBottom: 10 }}
        />
        {!isEditing && (
          <>
            <label>Password</label>
            <Input.Password
              value={newAdmin.password}
              onChange={(e) => handleInputChange(e, "password")}
              style={{ marginBottom: 10 }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
